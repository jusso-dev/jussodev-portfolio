---
title: "The phishing email had two targets"
date: 2026-11-06
summary: "Barracuda found phishing emails carrying a normal lure for the person and hidden instructions for their AI assistant. The fix starts with not trusting summaries for money."
tags: ["phishing", "prompt-injection", "email-security", "ai"]
draft: false
---

Barracuda published research on 7 October about phishing emails built for two readers at once. Infosecurity Magazine has a good summary: [Attackers Hide AI Prompt Injections Inside Phishing Emails](https://www.infosecurity-magazine.com/news/attackers-hide-ai-prompt/). Barracuda followed up on 23 October with a broader piece on [indirect prompt injection through email](https://blog.barracuda.com/2026/10/23/indirect-prompt-injection-email-ai-assistants).

## Two layers in one message

The visible layer was ordinary phishing. The sample Barracuda analysed carried a password-protected attachment, with the password in the body of the email. That's an old trick, and it works because automated controls can't open the attachment to inspect it. Opening it leads to credential theft or malware.

The hidden layer was for whatever AI system reads the message. If the recipient overlooked the email, the hidden instructions tried to get their AI assistant to present it as legitimate or urgent in its summary. The goal was to nudge the person back to the email and get the click.

Barracuda described other ways the hidden text could be used. It could tell an assistant to ignore its previous directions and request a wire transfer, leak data or surface a fake urgent action. In one invoice example, it told the summarising model to add a fake priority action: change a supplier's bank details.

Barracuda didn't say how widespread the campaign was.

## Where the instructions hide

Four techniques came up often:

- HTML comments, which never render in a mail client but stay in the source a model might read.
- Text styled to be invisible, such as a zero pixel font or white on white.
- Base64-encoded blocks, for example inside an image data string.
- Zero-width Unicode characters mixed into normal text.

As Malwarebytes pointed out in its coverage, whether any of that actually reaches a model depends on how a particular tool extracts and prepares the email. Some tools will strip it. Some won't.

## Why it matters

The line from Barracuda's follow-up that stuck with me is simple: the employee sees a routine email, the AI sees a command. Many of the usual phishing signs may be missing. There might be no bad link, no executable and no request for credentials. The payload is the language.

I think the bank details example is the one finance teams should hear. Plenty of people now read an AI summary instead of the email. If the summary says there's an action to change a supplier's account, that summary was partly written by whoever sent the email.

Barracuda also mentioned other uses of the same idea: hidden text in a resume telling an AI screening tool to score the candidate 10 out of 10, and poisoned web documentation that could get a coding assistant to add a credential-stealing line.

## What I'd put in place

- Strip hidden elements and invisible characters before content reaches an AI tool, where your platform allows it.
- Never treat a summary as verification for a payment or a change to bank details. Check the original and confirm through a known channel.
- Keep human approval on anything an assistant could do that moves money, changes records or sends data out.
- Give AI assistants only the access they need. An assistant that can read mail but not send it is a smaller problem.
- Watch for repeated injection attempts, since they tell you someone is testing.

Barracuda's own point is that no single control stops every variation. I'd add that the cheapest control is a rule people already understand: no bank detail changes without a phone call.
