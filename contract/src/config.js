require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Hack3Donation";
const description = "These NFTs are used to pay the homage to those generous donators.";
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically

const layerConfigurations = [{
    growEditionSizeTo: 15,
    layersOrder: [
        { name: "content" },
        { name: "frame" },
    ],
}, ];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
    width: 2732,
    height: 2048,
    smoothing: false,
};

const extraMetadata = {
    external_url: "https://hackgroup3.io", // Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = "your api key";
const CHAIN = 'rinkeby'; // only rinkeby, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'DonateHackathon';
const CONTRACT_SYMBOL = 'DH';
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting
const OWNER_ADDRESS = '0xFe2CB377D51f8C69142353104989C70900e81C2a';
const TREASURY_ADDRESS = '0xFe2CB377D51f8C69142353104989C70900e81C2a';
const MAX_SUPPLY = 100000; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED!
const MINT_PRICE = 0.0001; // Minting price per NFT. Rinkeby = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 1000; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-07-22T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00

// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = null; // Optional. Eg: 2022-02-08T11:30:48+00:00
const ROYALTY_SHARE = 8000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x05d0d5C28fa65dbDaE3780365a2cD0558B7C1E20"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri
const PRESALE_WHITELISTED_ADDRESSES = []; // only update if you want to manually set the whitelisted addresses

// ** OPTIONAL **
let CONTRACT_ADDRESS = "0x4e63CF0249401273B388D16F5A13Dc1345575777"; // If you want to manually include it

// Generic Metadata is optional if you want to reveal your NFTs
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "The NFTs are used to pay homage to the generous donators."; // Replace with what you want the generic descriptions to say.
const GENERIC_IMAGE = "https://ipfs.io/ipfs/QmUf9tDbkqnfHkQaMdFWSGAeXwVXWA61pFED7ypx4hcsfh"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
    const rawContractData = fs.readFileSync(
        `${basePath}/build/contract/_contract.json`
    );
    const contractData = JSON.parse(rawContractData);
    if (contractData.response === "OK") {
        CONTRACT_ADDRESS = contractData.contract_address;
    }
} catch (error) {
    // Do nothing, falling back to manual contract address
}


const gif = {
    export: false,
    repeat: 0,
    quality: 100,
    delay: 500,
};

const text = {
    only: false,
    color: "#ffffff",
    size: 20,
    xGap: 40,
    yGap: 40,
    align: "left",
    baseline: "top",
    weight: "regular",
    family: "Courier",
    spacer: " => ",
};

const pixelFormat = {
    ratio: 2 / 128,
};

const background = {
    generate: true,
    brightness: "80%",
    static: false,
    default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
    thumbPerRow: 5,
    thumbWidth: 50,
    imageRatio: format.height / format.width,
    imageName: "preview.png",
};

const preview_gif = {
    numberOfImages: 5,
    order: "ASC", // ASC, DESC, MIXED
    repeat: 0,
    quality: 100,
    delay: 500,
    imageName: "preview.gif",
};

module.exports = {
    format,
    baseUri,
    description,
    background,
    uniqueDnaTorrance,
    layerConfigurations,
    rarityDelimiter,
    preview,
    shuffleLayerConfigurations,
    debugLogs,
    extraMetadata,
    pixelFormat,
    text,
    namePrefix,
    network,
    gif,
    preview_gif,
    AUTH,
    LIMIT,
    CONTRACT_ADDRESS,
    OWNER_ADDRESS,
    TREASURY_ADDRESS,
    CHAIN,
    GENERIC,
    GENERIC_TITLE,
    GENERIC_DESCRIPTION,
    GENERIC_IMAGE,
    CONTRACT_NAME,
    CONTRACT_SYMBOL,
    METADATA_UPDATABLE,
    ROYALTY_SHARE,
    ROYALTY_ADDRESS,
    MAX_SUPPLY,
    MINT_PRICE,
    TOKENS_PER_MINT,
    PRESALE_MINT_START_DATE,
    PUBLIC_MINT_START_DATE,
    BASE_URI,
    PREREVEAL_TOKEN_URI,
    PRESALE_WHITELISTED_ADDRESSES
};