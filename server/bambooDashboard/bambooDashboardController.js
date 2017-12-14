'use strict';
let driver = require('../config/neo4j');
let session = driver.session();

var getProjects = (req, res) => {
  let session = driver.session();
  // let query ='match (n:project) return n';
  let query = 'match (n:project)<-[:plan_of]-(a:plan) return n,count(a)';
  session.run(query).then(function(result) {
    res.send(result);
  })
};

var getPlanDetails = (req, res) => {
  let planDetails = [];
  let session = driver.session();
  let query ='match (n:project{key:"'+req.body.project+'"})<-[r:plan_of]-(m) return m';
  session.run(query).then(function(result) {
    result.records.map((item,index)=>{
      planDetails.push({name:item._fields[0].properties.name,key:item._fields[0].properties.key,score:item._fields[0].properties.score.low,stages:[]});
      let session1 = driver.session();
      let query1 ='match (n:plan{key:"'+item._fields[0].properties.key+'"})<-[r:stage_of]-(m) return m';
      session1.run(query1).then(function(result1) {
        result1.records.map((item1,index1)=>{
          planDetails[index].stages.push({name:item1._fields[0].properties.name,score:item1._fields[0].properties.score.low,jobs:[]})
          let session2 = driver.session();
          let query2 ='match (n:plan{key:"'+item._fields[0].properties.key+'"})<-[r:stage_of]-(o:stage{name:"'+item1._fields[0].properties.name+'"})<-[p:job_of]-(m) return m';
          session2.run(query2).then(function(result2){
            result2.records.map((item2,index2)=>{
              planDetails[index].stages[index1].jobs.push(item2._fields[0].properties);
              if(result2.records.length == index2+1 && result1.records.length==index1+1 && result.records.length == index+1){
                res.send(planDetails);
              }
            })
          })
        })
      })
    })
  })
};

var getPlans =(req,res) =>{
  let project = req.body.project;
  let logDetails = [];
  let session = driver.session();
    let query ='match (n:project{key:"'+req.body.project+'"})<-[:plan_of]-(plan:plan) return plan';
    session.run(query).then(function(result) {
        result.records.map((item,index)=>{
          let session1 = driver.session();
            let query1 ='match (n:project{key:"'+req.body.project+'"})<-[:plan_of]-(plan:plan{key:"'+item._fields[0].properties.key+'"})<-[:build_of]-(build:build) return build';
            session1.run(query1).then(function(result1) {
              logDetails.push({planName:item._fields[0].properties.name,planKey:item._fields[0].properties.key,build:[]})
              result1.records.map((item1,index1)=>{
                console.log('oooo',logDetails[index]);
                logDetails[index].build.push({buildNo:item1._fields[0].properties.buildNo,history:JSON.parse(item1._fields[0].properties.data)})
                if(result.records.length == logDetails.length){
                  res.send(logDetails);
                }
              })

            })
        })
    })
}

// var getStages = (req, res) => {
//   let session = driver.session();
//   let query ='match (n:plan{key:"'+req.body.plan+'"})<-[r:stage_of]-(m) return m';
//   session.run(query).then(function(result) {
//     res.send(result);
//   })
// };

module.exports = {
  getProjects,
  getPlanDetails,
  getPlans
  // getStages
};
