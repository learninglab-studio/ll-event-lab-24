const Airtable = require(`airtable`)
// const { red, cyan, blue, yellow } = require(`../ll-utilities/mk-utilities`)

/**
 * Adds a record to a specified Airtable base and table.
 * 
 * @param {Object} options - The options for adding the record.
 * @param {string} options.baseId - The ID of the Airtable base.
 * @param {string} options.table - The name of the table in the base.
 * @param {Object} options.record - The record data to be added.
 * 
 * @returns {Object} The result from Airtable after adding the record.
 */
module.exports.addRecord = async function(options){
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(options.baseId);
  var airtableResult = await base(options.table).create(options.record).then(result => {
    console.log("saved to airtable");
    return result;
  })
    .catch(err => {
      console.log("\nthere was an error with the AT push\n");
      console.error(err);
      return;
    });
  return airtableResult;
}

module.exports.updateRecord = async function(options) {
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(options.baseId);
  
  var recordId = options.recordId; // ID of the record you want to update
  var updatedFields = options.updatedFields; // Updated field values for the record

  var airtableResult = await base(options.table).update(recordId, updatedFields).then(result => {
    console.log("updated record in Airtable");
    return result;
  })
  .catch(err => {
    console.log("\nthere was an error with the AT update\n");
    console.error(err);
    return;
  });

  return airtableResult;
}


module.exports.findOneById = async function(options) {
  var result = await options.base(options.table)
    .find(options.recordId)
    .catch(err=>{console.error(err); return});
  return result;
}

// options is an object with view, base, value, and table properties
module.exports.findOneByValue = async function(options) {
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(options.baseId);
  const theRecords = [];
  try {
    await base(options.table).select(
    {
      maxRecords: 1,
      view: options.view ? options.view : "Grid view",
      filterByFormula: `${options.field}='${options.value}'`
    }
    ).eachPage(function page(records, next){
      theRecords.push(...records);
      next()
    })
    // .then(()=>{
    //   // return(theRecords);
    // })
    .catch(err=>{console.error(err); return})
    return theRecords[0];
  } catch (error) {
    return error
  }
}

module.exports.findManyByValue = async function(options) {
  theRecords = [];
  var queryOptions = {
    maxRecords: options.maxRecords ? options.maxRecords : 10,
    view: options.view ? options.view : "Grid view",
    filterByFormula: `${options.field}=${options.value}`
  }
  console.log(queryOptions);
  await options.base(options.table).select(queryOptions).eachPage(function page(records, next){
    theRecords.push(...records);
    next()
  })
  // .then(()=>{
  //   // return(theRecords);
  // })
  .catch(err=>{console.error(err); return})
  return theRecords;
}

module.exports.findManyByMultiSelectValue = async function(options) {
  const theRecords = [];
  var queryOptions = {
    maxRecords: options.maxRecords ? options.maxRecords : 10,
    view: options.view ? options.view : "Grid view",
    filterByFormula: `${options.field}=${options.value}`
  }
  console.log(queryOptions);
  await options.base(options.table).select(queryOptions).eachPage(function page(records, next){
    theRecords.push(...records);
    next()
  })
  // .then(()=>{
  //   // return(theRecords);
  // })
  .catch(err=>{console.error(err); return})
  return theRecords;
}


module.exports.findManyByFormula = async function(options) {
  theRecords = [];
  await options.base(options.table).select(
    {
      maxRecords: options.maxRecords,
      view: options.view ? options.view : "Grid view",
      filterByFormula: options.formula
    }
  ).eachPage(function page(records, next){
    theRecords.push(...records);
    next()
  })
  // .then(()=>{
  //   // return(theRecords);
  // })
  .catch(err=>{console.error(err); return})
  return theRecords;
}

module.exports.findMany = async function(options) {
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(options.baseId);
  const theRecords = [];
  await base(options.table).select(
    {
      maxRecords: options.maxRecords ? options.maxRecords : 10,
      view: options.view ? options.view : "Grid view",
    }
  ).eachPage(function page(records, next){
    theRecords.push(...records);
    next()
  })
  // .then(()=>{
  //   // return(theRecords);
  // })
  .catch(err=>{console.error(err); return})
  return theRecords;
}

module.exports.findManyByFormula = async function(options) {
  theRecords = [];
  await options.base(options.table).select(
    {
      maxRecords: options.maxRecords,
      view: options.view,
      filterByFormula: options.formula
    }
  ).eachPage(function page(records, next){
    theRecords.push(...records);
    next()
  })
  // .then(()=>{
  //   // return(theRecords);
  // })
  .catch(err=>{console.error(err); return})
  return theRecords;
}
