---
title: Pull Request etiquette
toc: true
category: tech
---

Some thoughts on good Pull Request (PR) practices to make your reviewer's life
easier.

## Provide context

PRs should contain context on the change. This could be a paragraph or two in
the PR description, or a link to a ticket. If linking to a ticket, the ticket
should have context beyond just a title. There's no need to go into too much
detail, it could simply be something like:

> This PR allows widgets to have customizable colors. The PR is part of our new
> company strategy to convince the widgetless that being widgetless is bad and
> they should buy our now-colorful widgets. Here's the PRD (link) and RFC
> (link).

Providing context will be helpful if you're opening a PR against a repository
owned by a different team. Hopefully you've already had a discussion with the
team prior to your PR, so your PR doesn't come as a surprise. Even so, your
reviewer may have forgotten and need a refresher. Rather than have them dig
through Slack conversations, by up front and give them the context.

The context you provide also helps anyone in the future wanting to understand
the context behind a particular change. Too often have I encountered a
particularly confusing bit of code, do a `git blame` hoping to understand the
reasoning behind it, and find that there's just an empty PR description.

## Provide steps to test

If the change is simple enough, this could just be in the form of unit tests.
For more complex changes that require testing in a local or staging
environment, you should document how you went about testing the change.

First of all, based on how you describe your tests, your reviewer will be able
to identify if there might be an edge case you've missed, even before looking
at the code.

Secondly, your tests provide assurance to your reviewer that you've done your
due diligence in validating your change. Approvals come easier when you assure
your reviewer you didn't just immediately open a PR after updating the code.

Finally, you reduce the friction for your reviewer to verify the change
themselves. Sometimes when reviewing someone else's code, I want to verify that
it works. I may not have time to figure out the steps to test the PR myself, so
I end up deferring review until I have more time. Having well documented steps
makes it easier for me to test, and makes it more likely I'll review your code
sooner rather than later.

## Make it easy to review

### Keep your PRs small

No one likes reviewing huge PRs. Don't expect your massive PR to reviewed in a
timely fashion. Don't expect to get a good review on your massive PR either.

If you find your PRs getting too large, see if there's a sensible way to split
your code change into smaller discrete changes. Over time you'll get better at
identifying beforehand if a code change will be too large, and you shouldn't
find yourself in the position of having to split an existing PR too often.

### Structure your commits

The easiest PRs I've had the pleasure of reviewing are when the commits are
structured such that I can review sequentially by commits. Having sensible
commits is a skill, and requires planning even before making the first change.
Try to have a good idea of the sequence of changes. Here's an example of what a
sequence of commits might look like:

```
ed9c731 Add migration to add color column in widget table
977e070 Add storage method to update widget color
c982ebb Handle color changes in UpdateWidget RPC
70168e2 Add tests
d0de359 Update GetWidget RPC to return widget color
```

Of course, it's not feasible to make perfect commits all the time. You'll often
find yourself adding fixes or small changes. Even so, you can keep a clean
commit history by making liberal use of `git rebase` and `git commit --fixup`.
Here are some resources for using rebase and fixup effectively:

- :star: [Rewriting commit history](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)
- [Interactive rebasing](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#_changing_multiple)
- [Using fixup](https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html)

### Add review notes

Let your reviewer know how best to review your change. Perhaps let them know
which file to look at first. You can also help by giving them an overview of
the code architecture.

Here's a real-world example of some review notes I've written for a PR (with
sensitive info sanitized):

> The PR is quite big, 500ish lines but I think it's quite easy to review.
>
> The `/service/user_order_history.go` file contains all the important changes.
>
> The `type userOrderHistoryInteractor struct{...}` contains all the business
> logic related to order history. I'm encapsulating all the order history
> business logic in this interactor struct so it's clear what feature the
> business logic is for. Better than polluting the package namespace with
> functions named `getXXXForUserOrderHistory`, `getYYYForUserOrderHistory`,
> etc.
>
> The `func (g *svc) GetUserOrderHistory(...)` function is the RPC
> handler. The handler code is very straightforward, should be simple to
> understand what it does. Here's an overview of what it's doing, with the
> error handling removed for brevity:
>
> ```go
> // redacted
> ```
>
> Review tips:
>
> 1. It's probably much easier to review in your editor rather than github,
>    because all the important changes are in one file.
> 2. Start your review with the `GetUserOrderHistory` method.
> 3. In the `GetUserOrderHistory` method, everytime you see a interactor method
>    called (e.g. `interactor.GetOrders`), then jump to that method and review
>    that. Each method is self-contained and does only one thing, so should be
>    quite simple to review.

As you can see, even though I was opening a large PR, and without the benefit
of having a clean commit history, I'm still able to guide my reviewer towards
easily reviewing it.
