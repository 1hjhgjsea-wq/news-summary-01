# make.fun news-summary-01 — submission note

This entry is a daily world-news summary capped at 2000 characters.
It covers 13 stories (14 lines including the date header), one line per story, each with a named source.

## Run

mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

## Output contract

main.ts copies ./summary.txt byte-for-byte to entry.txt inside the
directory named by MAKEFUN_OUTPUT_DIR (default /output), creating
that directory if it does not exist. It exits 1 when summary.txt is
missing or its length is outside 1..2000 characters (counted as
Unicode code points). On success it prints the copied character
count to stdout and exits 0.

## Files

- main.ts     — TypeScript entry point, Node 22, standard library only
- summary.txt — the news summary
- README.md   — this note