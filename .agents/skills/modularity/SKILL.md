---
name: design
description: "Designs modular high-level architectures from functional requirements and produces design documents for each module."
---

# High-Level Design

You design modular high-level architectures from functional requirements and produce comprehensive design documentation. You apply the Balanced Coupling model (preloaded from the balanced-coupling skill) to all architectural decisions.

## Input

If `$ARGUMENTS` contains a file path, read that file as the functional requirements input.
If `$ARGUMENTS` is empty or not a valid file path, use `AskUserQuestion` to request it. Header: "Requirements". Question: "Please provide the path to the functional requirements file."
Do not proceed until you have a valid file path and can successfully read the file.

Use TaskCreate to track these 6 steps: Understand the Requirements, Design the Modular Architecture, Write Module Design Documents, Write Module Test Specifications, Write the Architecture Document, Modularity Review.

## Interaction Rules

Always use `AskUserQuestion` for user input. Follow these principles:

- **One question at a time.** Never batch multiple questions into one message.
- **Multiple choice preferred.** Provide 2-4 concrete options with descriptions. Easier to answer than open-ended.
- **"Other" is automatic.** The tool always provides a free-text "Other" option, so you don't need to add one.
- **Use headers.** Short labels (max 12 chars) like "Approval", "Subdomain", "Coupling".

## Process

Follow these steps strictly. Each step requires explicit user approval before moving to the next. If you encounter ambiguity at any step, stop and ask the user for clarification using `AskUserQuestion`. **Never assume.**

### Step 1: Understand the Requirements

Read the functional requirements file. Then:

1. **Restate the functional requirements** in your own words. Organize them into cohesive functional areas.
2. **Discover what's missing for coupling-aware design.** Think about what you need to make good Balanced Coupling decisions — domain classification (determines volatility), organizational structure (determines distance), and integration patterns (determines strength). Identify gaps in the requirements, especially:
   - Business areas where core vs supporting vs generic classification is ambiguous — propose your interpretation and ask the user to confirm or correct
   - Organizational constraints that affect module boundaries (team ownership, deployment units, shared infrastructure)
   - Strategic direction that affects where volatility will be highest and where to invest design effort
   - Integration requirements where the appropriate coupling strength is unclear

   Ask the user about each gap individually using `AskUserQuestion`. Skip what's clear from the requirements. Do not ask questions whose answers would not change your design — every question should resolve an ambiguity that affects coupling decisions. You are not limited to these categories — if the requirements leave something ambiguous that would affect your architectural decisions, ask about it. Ground questions in specific requirements you read.

3. **Classify the domain areas** using DDD subdomains (core / supporting / generic). This determines volatility and where to invest design effort. Analyze the requirements and propose classifications yourself. Present them as a table:

| Subdomain | Classification | Rationale |
| --------- | -------------- | --------- |
| {area 1}  | Core           | {why}     |
| {area 2}  | Supporting     | {why}     |
| {area 3}  | Generic        | {why}     |

Then ask the user to validate using `AskUserQuestion`:

| Header     | Question                                       | Options                                                                                                                                    |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Subdomains | Do these subdomain classifications look right? | 1. **Approved** - All correct 2. **Some are wrong** - I'll tell you which to change 3. **Missing subdomains** - There are areas not listed |

If the user says some are wrong, ask which ones and what the correct classification should be.

Present your full understanding to the user for validation using `AskUserQuestion`:

| Header   | Question                                                  | Options                                                                                                                                                   |
| -------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Approval | Does this understanding of the requirements look correct? | 1. **Approved** - Proceed to architecture design 2. **Needs changes** - I'll explain what's wrong 3. **Missing context** - There's more I should tell you |


---

## Progressive Disclosure Reference
For the complete reference catalog, extended examples, and deep edge cases, read [references/full-guide.md](file:///c:/Users/tomas/Desktop/web-software-factory/.agents/skills/modularity/references/full-guide.md).
