# Money Model Analyzer: Benchmarks and Levers

Deep detail for the money-model-analyzer skill. The SKILL.md runs the
analysis. This file holds the benchmark table, the funnel math, and the full
stage-to-lever map.

## Workshop benchmarks

These are the "no data yet" defaults. Use them to fill any rate the user is
missing, and as the bar to score against.

| Stage | Benchmark | Direction |
|---|---|---|
| Close rate (qualified call to deal) | 25% | higher is better |
| Qualification rate (held call qualifies) | 80% | higher is better |
| Show rate (booked call shows) | 70% | higher is better |
| LTA (positive reply to booked call) | 30% | higher is better |
| Leads contacted per positive reply | 75 | lower is better |
| Sequence length | 3 emails | — |
| Send-through factor | 0.85 | — |

## The funnel, run backward

This is the same chain the 04-scale skill builds. The analyzer re-runs it to
measure the cost of each weak stage.

```
Revenue goal    / ACV                      = deals needed
Deals           / close rate               = qualified calls needed
Qualified calls / qualification rate       = held calls needed
Held calls      / show rate                = booked calls needed
Booked calls    / LTA                      = positive replies needed
Positive replies x leads-per-positive      = leads to contact
Leads to contact x sequence length x 0.85  = total emails (over the period)
Total emails    / months in period         = monthly emails to send
```

## How to find the costliest stage

1. Run the chain with the user's real numbers. Record monthly emails.
2. For each stage that is below benchmark, run the chain again with only that
   stage reset to benchmark. Record the new monthly emails.
3. The email saved is the difference. The stage with the largest saving is the
   weakest link, the one to fix first.

This beats "pick the lowest rate." A stage near the top of the funnel
multiplies everything below it, so a small gap up top can cost more email than
a big gap at the bottom.

## Stage to lever map

| Weak stage | Root cause | Lever / skill |
|---|---|---|
| Close rate | Offer or sales call | 07-offer, then 13-lead-to-appointment |
| Qualification rate | Wrong people booking | 06-market-research (ICP), 10-lead-list |
| Show rate | Show-up engine | 13-lead-to-appointment |
| LTA | Reply handling, offer | 13-lead-to-appointment, 07-offer |
| Leads per positive | Top of funnel reply rate | 06-market-research, then 07-offer, then 09-copy-frameworks |
| None below benchmark, volume still high | Capacity, not conversion | 05-deliverability |

## The order rule

Fix one stage, send about 1,000 more leads, then re-score. Never move three
levers at once or the data cannot tell you which one worked.
