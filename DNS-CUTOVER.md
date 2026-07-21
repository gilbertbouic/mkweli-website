# Point mkweli.tech to the new site (GitHub Pages)

The new professional site is published at:
https://gilbertbouic.github.io/mkweli-website/

Repo: https://github.com/gilbertbouic/mkweli-website

## Why DNS change is required

`mkweli.tech` currently still points at **Carrd** (A record → Cloudflare `172.66.0.70`).
Nameservers are Hostinger (`ns1.dns-parking.com` / `ns2.dns-parking.com`).

Email already uses Hostinger MX — **do not remove MX records**.

## Steps in Hostinger hPanel

1. Log in at https://hpanel.hostinger.com  
   Email: `gilbert@mkweli.tech` (or your Hostinger owner account)
2. Open **Domains → mkweli.tech → DNS / Name Servers**
3. **Edit the apex A records** for `@` / `mkweli.tech`.  
   Remove the Carrd/Cloudflare IP (`172.66.0.70`).
4. Add these **four A records** (GitHub Pages):

   | Type | Name | Value              | TTL  |
   |------|------|--------------------|------|
   | A    | @    | 185.199.108.153    | 3600 |
   | A    | @    | 185.199.109.153    | 3600 |
   | A    | @    | 185.199.110.153    | 3600 |
   | A    | @    | 185.199.111.153    | 3600 |

5. Optional **www**:
   | Type  | Name | Value                         | TTL  |
   |-------|------|-------------------------------|------|
   | CNAME | www  | gilbertbouic.github.io        | 3600 |

6. **Keep** existing:
   - MX → `mx1.hostinger.com` / `mx2.hostinger.com`
   - TXT SPF `v=spf1 include:_spf.mail.hostinger.com ~all`
   - Google site verification TXT (if present)

7. After DNS propagates (often 5–60 minutes), re-enable the custom domain:
   - Ensure repo root has file `CNAME` containing: `mkweli.tech`
   - GitHub → repo **Settings → Pages → Custom domain** → `mkweli.tech` → Enforce HTTPS

## Carrd

You can leave the old Carrd site unpublished or disconnect the custom domain in Carrd settings so it no longer expects `mkweli.tech`.

## Login notes (from website hostinger.odt)

- Carrd: gilbertbouic@gmail.com (site rebuild is now GitHub Pages, not Carrd)
- Hostinger email: gilbert@mkweli.tech
