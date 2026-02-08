#!/usr/bin/env python3
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from collections import Counter

COLOR_RE = re.compile(
    r"(?:#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8}))"
    r"|(?:\brgba?\([^\)]+\))"
    r"|(?:\bhsla?\([^\)]+\))"
    r"|(?:\boklab\([^\)]+\))"
    r"|(?:\boklch\([^\)]+\))"
)

class LinkStyleParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stylesheets = []
        self.inline_styles = []
        self.style_blocks = []
        self._in_style = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and attrs.get("rel") == "stylesheet" and attrs.get("href"):
            self.stylesheets.append(attrs["href"])
        if tag == "style":
            self._in_style = True
        if "style" in attrs:
            self.inline_styles.append(attrs["style"])

    def handle_endtag(self, tag):
        if tag == "style":
            self._in_style = False

    def handle_data(self, data):
        if self._in_style and data:
            self.style_blocks.append(data)


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "color-audit"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def extract_colors(text):
    return COLOR_RE.findall(text or "")


def main():
    if len(sys.argv) < 2:
        print("usage: extract_site_colors.py <url>")
        sys.exit(1)

    url = sys.argv[1]
    html = fetch(url)
    parser = LinkStyleParser()
    parser.feed(html)

    base = url
    styles = []

    for href in parser.stylesheets:
        css_url = urllib.parse.urljoin(base, href)
        try:
            styles.append(fetch(css_url))
        except Exception:
            continue

    styles.extend(parser.style_blocks)
    styles.extend(parser.inline_styles)

    counter = Counter()
    for block in styles:
        for color in extract_colors(block):
            counter[color.lower()] += 1

    for color, count in counter.most_common():
        print(f"{count:>4}  {color}")

if __name__ == "__main__":
    main()
