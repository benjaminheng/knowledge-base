---
title: "Homeserver setup"
---

## Overview

Infra notes:

- Debian 13
- btrfs filesystem
- Podman for services
- sftp for remote storage

Services deployed:

1. Tailscale
2. AdguardHome
3. Syncthing
4. Immich
5. LibreChat

Tailscale is set up with AdguardHome as the DNS resolver. DNS override is enabled, so all devices on the tailnet go through Adguard.

## Setup notes

### podman-restart.service

Debian removes this from its distribution of podman. The recommended approach is to use quadlets instead. I've opted to just restore the systemd service.

```
mkdir -p ~/.config/systemd/user
curl "https://raw.githubusercontent.com/containers/podman/refs/heads/main/contrib/systemd/system/podman-restart.service.in" | sed "/@@PODMAN@@/$(which podman)/g" > ~/.config/systemd/user/podman-restart.service
systemctl --user daemon-reload
systemctl --user enable podman-restart.service
loginctl enable-linger $USER
```

## Firewall rules

- Default: deny incoming, allow outgoing
- Rules: Allow incoming via tailscale

## Why LibreChat and not Open WebUI?

I've tried multiple times to set up Open WebUI. I like the simpler docker architecture for OWUI, with only a single container being needed. Unfortunately I find that OWUI just doesn't work as well with non-OpenAI and non-local models. Major annoyances I faced were a lack of support for Anthropic's thinking blocks and Claude Sonnet/Opus's native web search tool.

The "solution" (I'd consider it more of a workaround) is to use the Pipes feature or to use LiteLLM as a proxy. Even so, to get something like proper rendering of thinking blocks requires using esoteric flags at the LiteLLM layer to coerce Anthropic's thinking block format into OpenAI's format.

There's a difference in philosophy between these two services:

- OWUI is model-first, specifically models that adhere to the OpenAI spec.
- LibreChat is UI-first. Model idiosyncrasies are adapted to fit the UI.

Again, to use the thinking blocks as an example. In OWUI, only the OpenAI spec for thinking blocks has first-class support. Everything else requires workarounds, like using a custom Pipe function. In LibreChat, the UI comes first; the vision for the UI is to render thinking blocks in a certain way, and so there is logic to handle both OpenAI's and Anthropic's approach to thinking blocks. There is first-class support for these two providers (and other providers that LibreChat supports).

My overall thoughts:

- OWUI is more extensible.
- LibreChat is more opinionated.
- LibreChat is much more usable out of the box for Anthropic models.
- OWUI works well if only using OpenAI models or models that tightly adhere to the OpenAI spec.
- OWUI gives more customizability, so I'd prefer it for an enterprise deployment.
- LibreChat works better for personal use, if your use-cases don't involve local models.
