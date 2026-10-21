---
title: "The PHP RCE fixes are out. Patch internet-facing PHP now"
date: 2026-10-22
summary: "PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35 fix CVE-2026-109618 and CVE-2026-109619. Updating is the only complete fix."
tags: ["security", "php", "patching"]
draft: false
---

This follows on from yesterday's post, [Two critical PHP RCE bugs land overnight](https://justin.middler.io/blog/php-critical-rce-patch/). The emergency release has now shipped.

## The fixed versions

PHP released these on 21 October (1am Thursday 22 October in Canberra):

- PHP 8.5.12
- PHP 8.4.27
- PHP 8.3.36
- PHP 8.2.35

Release notes and downloads are on [php.net](https://www.php.net/). PHP says both bugs can allow unauthenticated remote code execution, that there are no complete mitigations, and that updating is the only safe choice.

Fixes only exist for the supported branches, 8.2 to 8.5. If you're on 8.1 or older, there's no patched build from PHP. Get onto a supported version.

## What the advisories say

PHP has published the details in two advisories, [CVE-2026-109618](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w) and [CVE-2026-109619](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp). Both are rated critical.

CVE-2026-109618 is memory corruption when PHP runs out of memory partway through a request. A crafted multipart upload can push a request into that state before any of your application code runs. PHP confirmed full remote code execution against Apache mod_php with default memory and input limits. It says FPM and FrankenPHP are likely affected too.

CVE-2026-109619 is a use-after-free. State left behind by one request gets read by the next request on the same worker. PHP confirmed code execution against mod_php, and the session upload progress path also worked against FPM.

In both cases the code runs as your web server's worker account.

## If you can't patch today

PHP is clear that these are partial at best:

- On PHP 8.5, set `fatal_error_backtraces=0` and restart every worker.
- Set `session.upload_progress.enabled=0` and restart every worker. Most apps don't use it, so I'd leave it off after patching too.
- If your app doesn't take multipart form uploads, block them at the proxy or load balancer before they reach PHP.

PHP also warns against using `RLIMIT_AS` or `RLIMIT_DATA` to cap memory, because that triggers the vulnerable path.

## What I'd do this morning

- Patch every internet-facing PHP server first, then the internal ones.
- Restart PHP-FPM and Apache after updating so the old workers are gone.
- Check your distro or hosting provider has shipped the new builds, and chase them if not.
- Given yesterday's reports of early attacks, review web logs and look for signs of compromise on anything that was exposed.
