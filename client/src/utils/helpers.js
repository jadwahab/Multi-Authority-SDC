import Coin from '../../lib/Coin';
import { params } from '../config'; // todo: should I create separate params instead? (those are associated with CoinSig)

export const getProofOfSecret = sk => (Coin.prepareProofOfSecret(params, sk));

export const getSimplifiedProof = (proof) => {
  const [W, cm, r] = proof;
  const bytesW = [];
  const bytesCm = [];
  const bytesR = [];
  W.toBytes(bytesW);
  cm.toBytes(bytesCm);
  r.toBytes(bytesR);

  return [bytesW, bytesCm, bytesR];
};

export const getSimplifiedSignature = (signature) => {
  const [h, sig] = signature;
  const sigBytes = [];
  const hBytes = [];
  sig.toBytes(sigBytes);
  h.toBytes(hBytes);

  return [hBytes, sigBytes];
};