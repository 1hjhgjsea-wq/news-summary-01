# Design

The deliverable is a news brief, not a program: `summary.txt` holds the
text and `main.ts` hands it to the grader untouched.

## The text

- One date header, then one line per story.
- Every line names its outlet: AP, Reuters, DOJ, CBS, BBC or AFP.
- The whole file is 1,995 characters, inside the 2,000 the task allows;
it is ASCII, so characters and bytes agree.
- Portugal was dropped to stay under the cap; the remaining stories keep
  their order, so the file reads as a day rather than a clip count.

## The program

`main.ts` exists only to satisfy the entrypoint contract.

- Read `summary.txt` from the module's own directory, not the cwd.
- Strip a leading UTF-8 BOM so a Windows editor cannot tilt the count.
- Count code points, not UTF-16 units, so the 2,000 cap means characters.
- Write the same bytes to `entry.txt` in `MAKEFUN_OUTPUT_DIR`, default
  `/output`, creating the directory when it is missing.
- Exit non-zero with a message on stderr when `summary.txt` is absent or
  longer than the cap.

## Checks

- `MAKEFUN_OUTPUT_DIR=out node main.ts` then `cmp summary.txt out/entry.txt`.
- The BOM case was tested by prefixing EF BB BF and confirming the copy
  came out at 1,995 bytes.
- Standard library only, Node 22, no build step, no dependencies.

## Reproduction

```
rm -rf out && mkdir -p out
MAKEFUN_OUTPUT_DIR=out node main.ts
cmp summary.txt out/entry.txt
wc -c out/entry.txt
```

The last line prints 1995 on a clean run.
