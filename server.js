/*
 * This file was auto-generated from the API references found at
 * https://apireference.connect.worldline-solutions.com/
 */

var express = require("express");
var app = express();
var busboy = require("connect-busboy");
var rawBody = require("raw-body");
var marko = require("marko");
require("marko/node-require").install();
var connectSdk = require("connect-sdk-nodejs");

var logger = require("./util/logger");

// stubs
var v1CreateHostedCheckoutStub = require("./stubs/v1/hostedcheckouts/create.json");
var v1CreateHostedMandateManagementStub = require("./stubs/v1/hostedmandatemanagements/create.json");
var v1CreatePaymentStub = require("./stubs/v1/payments/create.json");
var v1CompletePaymentStub = require("./stubs/v1/payments/complete.json");
var v1TokenizePaymentStub = require("./stubs/v1/payments/tokenize.json");
var v1ApprovePaymentStub = require("./stubs/v1/payments/approve.json");
var v1CapturePaymentStub = require("./stubs/v1/payments/capture.json");
var v1RefundPaymentStub = require("./stubs/v1/payments/refund.json");
var v1CreatePaymentDisputeStub = require("./stubs/v1/payments/dispute.json");
var v1CreateRefundCaptureStub = require("./stubs/v1/captures/refund.json");
var v1ApproveRefundStub = require("./stubs/v1/refunds/approve.json");
var v1CreatePayoutStub = require("./stubs/v1/payouts/create.json");
var v1ApprovePayoutStub = require("./stubs/v1/payouts/approve.json");
var v1GetDeviceFingerprintForGroupsStub = require("./stubs/v1/productgroups/deviceFingerprint.json");
var v1GetCustomerDetailsStub = require("./stubs/v1/products/customerDetails.json");
var v1GetDeviceFingerprintStub = require("./stubs/v1/products/deviceFingerprint.json");
var v1CreatePaymentProductSessionStub = require("./stubs/v1/products/sessions.json");
var v1RiskAssessmentBankAccountStub = require("./stubs/v1/riskassessments/bankaccounts.json");
var v1RiskAssessmentCardsStub = require("./stubs/v1/riskassessments/cards.json");
var v1ConvertBankAccountStub = require("./stubs/v1/services/bankaccount.json");
var v1IINDetailsStub = require("./stubs/v1/services/getIINdetails.json");
var v1CreateTokenStub = require("./stubs/v1/tokens/create.json");
var v1UpdateTokenStub = require("./stubs/v1/tokens/update.json");
var v1ApproveSepaDirectDebitTokenStub = require("./stubs/v1/tokens/approvesepadirectdebit.json");
var v1CreateMandateStub = require("./stubs/v1/mandates/create.json");
var v1CreateMandateWithReferenceStub = require("./stubs/v1/mandates/createWithMandateReference.json");
var v1CreateSessionStub = require("./stubs/v1/sessions/create.json");
var v1GetInstallmentsInfoStub = require("./stubs/v1/installments/getInstallmentsInfo.json");

var config = require("./config.json");

var client = connectSdk.init({
  host: config.apiEndpoint.host,
  scheme: config.apiEndpoint.scheme,
  port: config.apiEndpoint.port,
  enableLogging: config.enableLogging, // defaults to false
  logger: logger, // if undefined console.log will be used
  apiKeyId: config.apiKeyId,
  secretApiKey: config.secretApiKey,
  integrator: "Wordline"
  /*
  ,shoppingCartExtension: {
    creator: "Wordline.Creator",
    name: "Extension",
    version: "1.0",
    extensionId: "ExtensionId"
  }
  */
});

// DEMO app
var port = config.port;
var merchantId = config.merchantId;

app.use(busboy({
  immediate: true,
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}));

app.engine("marko", function (filePath, options, callback) {
  marko.load(filePath).renderToString(options, function (err, output) {
    callback(null, output);
  });
});
app.use("/global", express.static(__dirname + "/global"));
app.set("view engine", "marko");

app.get("/", function (req, res) {
  res.render("index");
});

function renderResponse(res, response, paymentContext) {
  if (response.file) {
    // a binary file
    res.status(response.status).set("Content-Type", response.file.contentType || "application/octet-stream");
    if (response.file.contentLength) {
      res.set("Content-Length", response.file.contentLength);
    }
    if (response.file.filename) {
      res.attachment(response.file.filename);
    } else {
      res.attachment();
    }
    response.body.pipe(res);
  } else {
    // JSON
    res.status(response.status).json(response.body).end();
  }
  if (paymentContext?.idempotence?.requestTimestamp) {
    // this call is made with idempotence annd is still being handled
    console.log("idempotence timestamp", paymentContext?.idempotence?.requestTimestamp);
  }
};

function renderError(res, error) {
  console.log(error, error.body);
  var status = (typeof error.status !== "undefined") ? error.status : 500;
  var body = (typeof error.body !== "undefined") ? error.body : error;
  res.status(status).json(body).end();
};

// all SDK methods; grouped by API version and API method

// v1 Hosted Checkouts
app.get("/v1/hostedcheckouts/create", function (req, res) {
  client.v1.hostedcheckouts.create(merchantId, v1CreateHostedCheckoutStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/hostedcheckouts/get/:hostedCheckoutId", function (req, res) {
  client.v1.hostedcheckouts.get(merchantId, req.params.hostedCheckoutId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/hostedcheckouts/delete/:hostedCheckoutId", function (req, res) {
  client.v1.hostedcheckouts.remove(merchantId, req.params.hostedCheckoutId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Hosted Mandate Management
app.get("/v1/hostedmandatemanagements/create", function (req, res) {
  client.v1.hostedmandatemanagements.create(merchantId, v1CreateHostedMandateManagementStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/hostedmandatemanagements/get/:hostedMandateManagementId", function (req, res) {
  client.v1.hostedmandatemanagements.get(merchantId, req.params.hostedMandateManagementId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Payments
app.get("/v1/payments/create", function (req, res) {
  var paymentContext = {}
  paymentContext.idempotence = {
    key: "idempotence"
  };

  client.v1.payments.create(merchantId, v1CreatePaymentStub, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/find", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.payments.find(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/get/:paymentId", function (req, res) {
  client.v1.payments.get(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/complete/:paymentId", function (req, res) {
  client.v1.payments.complete(merchantId, req.params.paymentId, v1CompletePaymentStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/thirdPartyStatus/:paymentId", function (req, res) {
  client.v1.payments.thirdPartyStatus(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/tokenize/:paymentId", function (req, res) {
  client.v1.payments.tokenize(merchantId, req.params.paymentId, v1TokenizePaymentStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/processchallenged/:paymentId", function (req, res) {
  client.v1.payments.processchallenged(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/approve/:paymentId", function (req, res) {
  client.v1.payments.approve(merchantId, req.params.paymentId, v1ApprovePaymentStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/capture/:paymentId", function (req, res) {
  client.v1.payments.capture(merchantId, req.params.paymentId, v1CapturePaymentStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/cancelapproval/:paymentId", function (req, res) {
  client.v1.payments.cancelapproval(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/captures/:paymentId", function (req, res) {
  client.v1.payments.captures(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/refund/:paymentId", function (req, res) {
  var paymentContext = {}
  paymentContext.idempotence = {
    key: "idempotence"
  };

  client.v1.payments.refund(merchantId, req.params.paymentId, v1RefundPaymentStub, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/refunds/:paymentId", function (req, res) {
  client.v1.payments.refunds(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/cancel/:paymentId", function (req, res) {
  client.v1.payments.cancel(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/dispute/:paymentId", function (req, res) {
  client.v1.payments.dispute(merchantId, req.params.paymentId, v1CreatePaymentDisputeStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/disputes/:paymentId", function (req, res) {
  client.v1.payments.disputes(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payments/devicefingerprint/:paymentId", function (req, res) {
  client.v1.payments.devicefingerprint(merchantId, req.params.paymentId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Captures
app.get("/v1/captures/get/:captureId", function (req, res) {
  client.v1.captures.get(merchantId, req.params.captureId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/captures/refund/:captureId", function (req, res) {
  client.v1.captures.refund(merchantId, req.params.captureId, v1CreateRefundCaptureStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Refunds
app.get("/v1/refunds/find", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.refunds.find(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/refunds/get/:refundId", function (req, res) {
  client.v1.refunds.get(merchantId, req.params.refundId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/refunds/approve/:refundId", function (req, res) {
  client.v1.refunds.approve(merchantId, req.params.refundId, v1ApproveRefundStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/refunds/cancel/:refundId", function (req, res) {
  client.v1.refunds.cancel(merchantId, req.params.refundId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/refunds/cancelapproval/:refundId", function (req, res) {
  client.v1.refunds.cancelapproval(merchantId, req.params.refundId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Disputes
app.get("/v1/disputes/get/:disputeId", function (req, res) {
  client.v1.disputes.get(merchantId, req.params.disputeId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/disputes/submit/:disputeId", function (req, res) {
  client.v1.disputes.submit(merchantId, req.params.disputeId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/disputes/cancel/:disputeId", function (req, res) {
  client.v1.disputes.cancel(merchantId, req.params.disputeId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.post("/v1/disputes/uploadFile/:disputeId", function (req, res) {
  var body = {};
  req.busboy.on("file", function (name, file, fileName, encoding, mimetype) {
    // ideally we would use content: file, but busboy will not continue until the entire content is read
    rawBody(file, function (err, content) {
      body[name] = {
        fileName: fileName,
        content: content,
        contentType: mimetype
      };
    });
  });
  req.busboy.on("field", function (name, value, nameTruncated, valueTruncated) {
    body[name] = value;
  });
  req.busboy.on("finish", function () {
    client.v1.disputes.uploadFile(merchantId, req.params.disputeId, body, null)
      .then(sdkResponse => renderResponse(res, sdkResponse))
      .catch(e => renderError(res, e));
  });
});

// v1 Payouts
app.get("/v1/payouts/create", function (req, res) {
  var paymentContext = {}
  paymentContext.idempotence = {
    key: "idempotence"
  };

  client.v1.payouts.create(merchantId, v1CreatePayoutStub, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/payouts/find", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.payouts.find(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/payouts/get/:payoutId", function (req, res) {
  client.v1.payouts.get(merchantId, req.params.payoutId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payouts/approve/:payoutId", function (req, res) {
  client.v1.payouts.approve(merchantId, req.params.payoutId, v1ApprovePayoutStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payouts/cancel/:payoutId", function (req, res) {
  client.v1.payouts.cancel(merchantId, req.params.payoutId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/payouts/cancelapproval/:payoutId", function (req, res) {
  client.v1.payouts.cancelapproval(merchantId, req.params.payoutId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Product Groups
app.get("/v1/productgroups/find", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.productgroups.find(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/productgroups/get/:paymentProductGroupId", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.productgroups.get(merchantId, req.params.paymentProductGroupId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/productgroups/deviceFingerprint/:paymentProductGroupId", function (req, res) {
  client.v1.productgroups.deviceFingerprint(merchantId, req.params.paymentProductGroupId, v1GetDeviceFingerprintForGroupsStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Products
app.get("/v1/products/find", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.products.find(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/products/get/:paymentProductId", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.products.get(merchantId, req.params.paymentProductId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/products/directory/:paymentProductId", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.products.directory(merchantId, req.params.paymentProductId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/products/customerDetails/:paymentProductId/:fiscalNumber", function (req, res) {
  v1GetCustomerDetailsStub.values[0].value = req.params.fiscalNumber;
  client.v1.products.customerDetails(merchantId, req.params.paymentProductId, v1GetCustomerDetailsStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/products/deviceFingerprint/:paymentProductId", function (req, res) {
  client.v1.products.deviceFingerprint(merchantId, req.params.paymentProductId, v1GetDeviceFingerprintStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/products/networks/:paymentProductId", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.products.networks(merchantId, req.params.paymentProductId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/products/sessions/:paymentProductId", function (req, res) {
  client.v1.products.sessions(merchantId, req.params.paymentProductId, v1CreatePaymentProductSessionStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Risk assessments
app.get("/v1/riskassessments/bankaccounts", function (req, res) {
  client.v1.riskassessments.bankaccounts(merchantId, v1RiskAssessmentBankAccountStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/riskassessments/cards", function (req, res) {
  client.v1.riskassessments.cards(merchantId, v1RiskAssessmentCardsStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Services
app.get("/v1/services/convertAmount", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.services.convertAmount(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/services/bankaccount", function (req, res) {
  client.v1.services.bankaccount(merchantId, v1ConvertBankAccountStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/services/getIINdetails", function (req, res) {
  client.v1.services.getIINdetails(merchantId, v1IINDetailsStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/services/privacypolicy", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.services.privacypolicy(merchantId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/services/testconnection", function (req, res) {
  client.v1.services.testconnection(merchantId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Tokens
app.get("/v1/tokens/create", function (req, res) {
  client.v1.tokens.create(merchantId, v1CreateTokenStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/tokens/get/:tokenId", function (req, res) {
  client.v1.tokens.get(merchantId, req.params.tokenId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/tokens/update/:tokenId", function (req, res) {
  client.v1.tokens.update(merchantId, req.params.tokenId, v1UpdateTokenStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/tokens/delete/:tokenId", function (req, res) {
  // pass query parameters on as-is
  var paymentContext = req.query;
  // add some extra headers
  var clientUserAgent = req.headers["user-agent"];
  paymentContext.extraHeaders = [
    { key: "X-GCS-ClientMetaInfo", value: clientUserAgent }
  ];

  client.v1.tokens.remove(merchantId, req.params.tokenId, paymentContext)
    .then(sdkResponse => renderResponse(res, sdkResponse, paymentContext))
    .catch(e => renderError(res, e));
});
app.get("/v1/tokens/approvesepadirectdebit/:tokenId", function (req, res) {
  client.v1.tokens.approvesepadirectdebit(merchantId, req.params.tokenId, v1ApproveSepaDirectDebitTokenStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Mandates
app.get("/v1/mandates/create", function (req, res) {
  client.v1.mandates.create(merchantId, v1CreateMandateStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/mandates/createWithMandateReference/:uniqueMandateReference", function (req, res) {
  client.v1.mandates.createWithMandateReference(merchantId, req.params.uniqueMandateReference, v1CreateMandateWithReferenceStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/mandates/get/:uniqueMandateReference", function (req, res) {
  client.v1.mandates.get(merchantId, req.params.uniqueMandateReference, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/mandates/block/:uniqueMandateReference", function (req, res) {
  client.v1.mandates.block(merchantId, req.params.uniqueMandateReference, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/mandates/unblock/:uniqueMandateReference", function (req, res) {
  client.v1.mandates.unblock(merchantId, req.params.uniqueMandateReference, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});
app.get("/v1/mandates/revoke/:uniqueMandateReference", function (req, res) {
  client.v1.mandates.revoke(merchantId, req.params.uniqueMandateReference, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Sessions
app.get("/v1/sessions/create", function (req, res) {
  client.v1.sessions.create(merchantId, v1CreateSessionStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Installments
app.get("/v1/installments/getInstallmentsInfo", function (req, res) {
  client.v1.installments.getInstallmentsInfo(merchantId, v1GetInstallmentsInfoStub, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// v1 Files
app.get("/v1/files/getFile/:fileId", function (req, res) {
  client.v1.files.getFile(merchantId, req.params.fileId, null)
    .then(sdkResponse => renderResponse(res, sdkResponse))
    .catch(e => renderError(res, e));
});

// init express
app.listen(port, function () {
  logger.info("server running at http://localhost:" + port);
});
