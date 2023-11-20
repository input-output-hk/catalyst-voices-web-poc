// 
// Exports data
// apiData.js
// 

var name = 'name';
var walletAddress = 'wallet_address';
var votingKey = 'voting_key';
var weightPercent = 'weight_percent';
var testFirstName = 'John';
var testLastName = 'Doe'

// system messages
var messages = {
  uniqueValidationError: "This attribute must be unique",
  validationError: "ValidationError",
  invalidUser: "Invalid identifier or password"
}

module.exports = {
  messages,
  name ,
  walletAddress,
  votingKey,
  weightPercent,
  testFirstName,
  testLastName
}