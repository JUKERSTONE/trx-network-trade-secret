;; use the SIP009 interface (testnet)
;; trait deployed by deployer address from ./settings/Devnet.toml
(impl-trait 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft-trait.nft-trait) ;; deploy your own nft-trait

(define-non-fungible-token TRX00 uint)

;; Store the last issues token ID
(define-data-var last-id uint u0)

;; Whitelist addresses
(define-constant whitelist (list 'ST266T94CKFP9E6PV3N2JZDYTZPBYF9Q7Z1D0BDBS 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM))

;; Claim a new NFT
(define-public (claim)
  (mint tx-sender))

;; SIP009: Transfer token to a specified principal
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
     (asserts! (is-eq tx-sender sender) (err u403))
     (nft-transfer? TRX00 token-id sender recipient)))

(define-public (transfer-memo (token-id uint) (sender principal) (recipient principal) (memo (buff 34)))
  (begin 
    (try! (transfer token-id sender recipient))
    (print memo)
    (ok true)))

;; SIP009: Get the owner of the specified token ID
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? TRX00 token-id)))

;; SIP009: Get the last token ID
(define-read-only (get-last-token-id)
  (ok (var-get last-id)))

;; SIP009: Get the token URI. You can set it to any other URI
(define-read-only (get-token-uri (token-id uint))
  (ok (some "https://token.stacks.co/{id}.json"))) ;; nft uri

;; Internal - Mint new NFT
(define-private (mint (new-owner principal))
 (if (is-eq (index-of whitelist new-owner) none)
        (ok "not whitelisted")
        (err (let ((next-id (+ u1 (var-get last-id))))
          (var-set last-id next-id)
        (nft-mint? TRX00 next-id new-owner)))
  ) 
)