# The Launchpad: Spam Trigger Words

Single source of truth for spam-trigger words to avoid in cold email copy and
spintax. Two places load this file: the copy-qa agent (flags them) and the
spintax-sendkit skill (never spins them in). One edit here updates both.

Source: mailmeteor spam words list, https://mailmeteor.com/blog/spam-words,
pulled 2026-06-21. Spam filters change, so treat this as a strong default, not
law. Words repeat across categories on purpose, a word can be spammy for more
than one reason.

---

## How to handle a spam word

When copy contains a word or phrase below, fix it in this order:

1. Rewrite it. Swap the word or phrase for a natural alternative at a grade 5 to
   6 reading level. No weird examples, no short AI-vibe lines, no filler. Most
   spam words have a plain swap ("free" becomes "no cost on your end,"
   "guaranteed" becomes "we stand behind it"). Rewriting is always first choice.

2. Pluralize only as a last resort. A few words are hard to replace without
   losing the meaning: insurance, finance, income, mortgage, loan, refinance,
   investment. Try a rewrite first. If none reads naturally, pluralize or lightly
   alter the word (insurance becomes insurances, finance becomes finances). The
   small change ducks the exact-word filter and a reader rarely notices. Never do
   this to a word you could simply rewrite.

Never leave a flagged word unhandled. Rewrite first, pluralize only when stuck.

---

## 1. Money and financial

$$$, €€€, £££, 50% off, A few bob, Accept cash cards, Accept credit cards,
Affordable, Affordable deal, Avoid bankruptcy, Bad credit, Bank, Bankruptcy,
Bargain, Billing, Billing address, Billion, Billion dollars, Billionaire, Card
accepted, Cards accepted, Cash, Cash bonus, Cash out, Cash-out, Cashcashcash,
Casino, Cents on the dollar, Check, Check or money order, Claim your discount,
Cost, Costs, Credit, Credit bureaus, Credit card, Credit card offers, Credit or
Debit, Deal, Debt, Discount, Dollars, Double your, Double your wealth, Earn,
Earn $, Earn cash, Earn extra income, Earn from home, Earn monthly, Earn per
month, Earn per week, Earn per year, Easy income, Easy terms, F r e e, For free,
For just $, Free access, Free consultation, Free gift, Free hosting, Free info,
Free investment, Free membership, Free money, Free preview, Free quote, Free
trial, Full refund, Get out of debt, Giveaway, Guaranteed deposit, Increase
revenue, Increase sales/traffic, Instant earnings, Instant income, Insurance,
Investment, Investment advice, Loans, Make $, Money-back guarantee, Mortgage,
Mortgage rates, Offer, One hundred percent free, Only $, Price, Price protection,
Profits, Quote, Refinance, Save $, Save big money, Subject to credit, US Dollars,
Why pay more?, Your income

## 2. Scam, fraud, and too good to be true

100% guaranteed, Access now, Act fast, Amazing deal, Apply now, As seen on, Best
deal, Big profit, Can't miss, Click below, Click here, Deal ending soon, Don't
delete, Double your money, Exclusive deal, Fantastic offer, Free membership, Get
it now, Great news, Guaranteed results, Important information, Increase sales,
Instant savings, Limited time, Must read, New customers only, No catch, No cost,
No credit check, No obligation, No strings attached, Once in a lifetime, Only
available here, Order now, Potential earnings, Pure profit, Risk-free, Special
invitation, Special offer, This won't last, Urgent, Will not believe

## 3. Marketing and sales overpromises

#1, 100% free, 100% off, 100% satisfied, Additional income, Amazed, Amazing,
Amazing deal, Amazing offer, Amazing stuff, Be amazed, Be surprised, Be your own
boss, Best bargain, Best deal, Best offer, Best price, Best rates, Big bucks,
Bonus, Can't live without, Consolidate debt, Double your cash, Double your
income, Drastically reduced, Earn extra cash, Earn money, Expect to earn, Extra,
Extra cash, Extra income, Fantastic, Fantastic deal, Fantastic offer, Fast cash,
Financial freedom, Free priority mail, Get paid, Incredible deal, Join millions,
Lowest price, Make money, Million dollars, Money-back guarantee, Prize, Promise,
Pure profit, Risk-free, Satisfaction guaranteed, Save up to, Special promotion,
The best, Thousands, Unbeatable offer, Unbelievable, Unlimited, Wonderful, You
will not believe your eyes

## 4. Urgency, clickbait, and pressure

Access, Access now, Act, Act immediately, Act now, Act now!, Action, Action
required, Apply here, Apply now, Apply now!, Apply online, Become a member,
Before it's too late, Being a member, Buy, Buy direct, Buy now, Buy today, Call,
Call free, Call free/now, Call me, Call now, Call now!, Can we have a minute of
your time?, Cancel now, Cancellation required, Claim now, Click, Click below,
Click here, Click me to download, Click now, Click this link, Click to get, Click
to remove, Contact us immediately, Deal ending soon, Do it now, Do it today,
Don't delete, Don't hesitate, Don't waste time, Exclusive deal, Expire, Expires
today, Final call, For instant access, For Only, For you, Friday before
[holiday], Get it away, Get it now, Get now, Get paid, Get started, Get started
now, Great offer, Hurry up, Immediately, Info you requested, Information you
requested, Instant, Limited time, New customers only, Now, Now only, Offer
expires, Once in lifetime, Only, Order now, Order today, Please read, Purchase
now, Sign up free, Sign up free today, Supplies are limited, Take action, Take
action now, This won't last, Time limited, Today, Top urgent, Trial, Urgent,
What are you waiting for?, While supplies last, You are a winner

## 5. Health and pharma

100% natural, All natural, Best price, Certified organic, Clinical trial, Cure
for, Diet pill, Doctor recommended, Double blind study, Fat burner, Fast weight
loss, Free consultation, Get slim, Guaranteed weight loss, Hair growth, Lose
weight fast, Medical breakthrough, Miracle cure, Money-back guarantee, Natural
remedy, No prescription needed, Online pharmacy, Over-the-counter, Pain relief,
Prescription drugs, Reverse aging, Safe and effective, Scientifically proven,
Secret formula, Weight loss, Youthful skin

## 6. Tech and security

Access your account, Account update, Action required, Activate now, Antivirus,
Change password, Click to verify, Confirm your details, Confidential information,
Cyber Monday, Data breach, Download now, Final notice, Free antivirus, Free
trial, Important update, Immediate action required, Improve security, Install
now, Last warning, Log in now, New login detected, Online account, Password
reset, Payment details needed, Phishing alert, Secure payment, Security breach,
Security update, Update account, Verify identity, Warning message

## 7. Gambling, adult, and blacklisted

Adult content, Bet now, Big win, Blackjack, Casino bonus, Cash out now, Click to
win, Double your money, Exclusive access, Free chips, Free spins, Gamble online,
Hot deal, Instant winnings, Jackpot, Live dealer, Lottery winner, Lucky chance,
Online betting, Online casino, Online gaming, Poker tournament, Risk-free bet,
Slots jackpot, Spin to win, Try for free, VIP offer, Winner announced, Winning
numbers, XXX
