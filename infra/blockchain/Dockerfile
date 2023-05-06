# hadolint ignore=DL3007
FROM ghcr.io/foundry-rs/foundry:latest
LABEL maintainer="zolboobayar.gantumur@owasp.org"

WORKDIR /app

EXPOSE 8545

ENTRYPOINT ["anvil", "-a", "0", "--host", "0.0.0.0", "--state", "/app/data/state.json"]
