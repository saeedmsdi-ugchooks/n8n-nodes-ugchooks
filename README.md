# UGCHooks for n8n

Turn product links into TikTok and Instagram Reels posts from your n8n workflows with the [UGCHooks](https://ugchooks.app) REST API. This community node sends ordinary HTTP resource requests and returns JSON responses. It does not connect to an MCP server or use JSON-RPC.

## Installation

Install `n8n-nodes-ugchooks` from **Settings → Community nodes** in your n8n instance. You can also install the npm package in a self-hosted n8n installation.

## Authentication

Create the **UGCHooks OAuth2 API** credential, select **Connect my account**, sign in to UGCHooks, and approve the listed permissions. Credentials use dynamic registration, OAuth authorization code flow, PKCE, expiring access tokens, and refresh tokens. The API resource is `https://ugchooks.app/v1`; REST tokens are separate from MCP tokens. Disconnect at any time from `https://ugchooks.app/oauth/n8n/connections`.

## Resources and operations

Choose a **Resource**, then an **Operation**. Only operations and input fields for that resource are shown. Resources: Account, Batch.

| Operation             | HTTP request                      | What it does                                                                                                                         |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Account → Get Profile | `GET /v1/account`                 | Your email and credit balance.                                                                                                       |
| Batch → Get Many      | `GET /v1/batches`                 | Your newest 100 batches, one per product link.                                                                                       |
| Batch → Get           | `GET /v1/batches/:batchId`        | Brief, written parts with every post (slides, hook beats, meme captions, caption and hashtags), locked parts and saved render links. |
| Batch → Create        | `POST /v1/batches`                | Reads a public product page and writes a brief plus the first 10 posts. Free, up to 20 links a day.                                  |
| Batch → Write Part    | `POST /v1/batches/:batchId/parts` | Writes 10 more posts (part 0–9). Parts 1–9 need the batch unlocked with one credit in the app.                                       |

The node cannot buy credits, unlock batches or post. JPG and MP4 files are rendered in the UGCHooks app; only files you saved there appear as render links. To publish to TikTok or Instagram, pass those links and captions to the [UGC API node](https://www.npmjs.com/package/n8n-nodes-ugcapi).

## Workflow behavior

Each input item produces one linked output item with the original response envelope. Product limits (daily link cap, locked part, unknown batch) fail the item with a readable message; enable **Continue On Fail** to keep going. HTTP errors omit credentials and raw request headers. Requests use the fixed product API origin, encode resource identifiers, and do not follow redirects.

## Development and support

Run `npm ci --ignore-scripts`, `npm test`, and `npm run review` to build and validate the package with the n8n node CLI and community package scanner. Source and release automation: [saeedmsdi-ugchooks/n8n-nodes-ugchooks](https://github.com/saeedmsdi-ugchooks/n8n-nodes-ugchooks). Report node issues in [GitHub Issues](https://github.com/saeedmsdi-ugchooks/n8n-nodes-ugchooks/issues).

Product: [UGCHooks](https://ugchooks.app) · [n8n guide](https://ugchooks.app/integrations/n8n/) · [Privacy](https://ugchooks.app/privacy/)

MIT license.
