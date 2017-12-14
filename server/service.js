const express = require('express');
const path = require('path');
// const connectflash = require('connect-flash');
let driver = require('./config/neo4j');
let session = driver.session();
const bodyParser = require('body-parser').json();

let createApp = function() {
  const app = express();
  return app;
};

let setupStaticRoutes = function(app) {
  app.use(express.static(path.join(__dirname, '../', 'webclient')));
  return app;
};

let setupAppRoutes = function(app) {
  return app;
};

let setupRESTRoutes = function(app) {
app.use('/bambooDashboard', require(path.join(__dirname, './bambooDashboard')));


  app.post('/add', bodyParser, (req, res) => {
  let session = driver.session();
  let query ='match (n:project{key:"'+req.body.project.key+'"}) return n';
  session.run(query).then(function(result) {
    if(result.records.length == 0){
      let session1 = driver.session();
      let query1 ="create (n:project{name:'"+req.body.project.name+"',key:'"+req.body.project.key+"',score:0})<-[:plan_of]-(m:plan{name:'"+req.body.plan.name+"',key:'"+req.body.plan.key+"',score:0})<-[:build_of]-(o:build{buildNo:'"+req.body.plan.stages.stage[0].jobs.job[0].build_Number+"',data:'"+JSON.stringify(req.body)+"'}) return n";
      session1.run(query1).then(function(result1) {
        req.body.plan.stages.stage.map((item,index)=>{
          let session2 = driver.session();
          let query2 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"}) create (n)<-[:stage_of]-(m:stage{name:"'+item.name+'",score:0,build_state:"'+item.build_state+'"}) return m'
          session2.run(query2).then(function(result2) {
            item.jobs.job.map((item1,index1)=>{
              let session3 = driver.session();
              let query3 = '';
              if(item1.build_state == 'NotBuilt') {
                query3 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+result2.records[0]._fields[0].properties.name+'"}) create (m)<-[:job_of]-(o:job{name:"'+item1.name+'",key:"'+item1.key+'",build_state:"'+item1.build_state+'",build_status:"'+item1.build_status+'",enabled_list:[],disabled_list:[]}) return o'
              }
              else {
                query3 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+result2.records[0]._fields[0].properties.name+'"})\
                create (m)<-[:job_of]-(o:job{name:"'+item1.name+'",key:"'+item1.key+'",build_state:"'+item1.build_state+'",build_status:"'+item1.build_status+'",enabled_list:'+JSON.stringify(item1.enabled_list)+',disabled_list:'+JSON.stringify(item1.disabled_list)+'}) return o'
              }
              session3.run(query3).then(function(result3) {
                console.log('New project created');
              })
            })
          })
        })
        res.send('Data added successfully')
      })
    }
    else{
      let session1 = driver.session();
      let query1 = 'match (n:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(m:plan{key:"'+req.body.plan.key+'"}) return m';
      session1.run(query1).then(function(result1) {
        if(result1.records.length == 0){
          let session2 = driver.session();
          let query2 ="match (n:project{key:'"+req.body.project.key+"'}) create (n)<-[:plan_of]-(m:plan{name:'"+req.body.plan.name+"',key:'"+req.body.plan.key+"',score:0})<-[:build_of]-(o:build{buildNo:'"+req.body.plan.stages.stage[0].jobs.job[0].build_Number+"',data:'"+JSON.stringify(req.body)+"'}) return m";
          session2.run(query2).then(function(result2) {
            req.body.plan.stages.stage.map((item,index)=>{
              let session3 = driver.session();
              let query3 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"}) create (n)<-[:stage_of]-(m:stage{name:"'+item.name+'",score:0,build_state:"'+item.build_state+'"}) return m'
              session3.run(query3).then(function(result3) {
                item.jobs.job.map((item1,index1)=>{
                  let session4 = driver.session();
                  let query4 = '';
                  if(item1.build_state == 'NotBuilt') {
                    query4 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+result3.records[0]._fields[0].properties.name+'"}) create (m)<-[:job_of]-(o:job{name:"'+item1.name+'",key:"'+item1.key+'",build_state:"'+item1.build_state+'",build_status:"'+item1.build_status+'",enabled_list:[],disabled_list:[]}) return o'
                  }
                  else {
                    query4 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+result3.records[0]._fields[0].properties.name+'"})\
                    create (m)<-[:job_of]-(o:job{name:"'+item1.name+'",key:"'+item1.key+'",build_state:"'+item1.build_state+'",build_status:"'+item1.build_status+'",enabled_list:'+JSON.stringify(item1.enabled_list)+',disabled_list:'+JSON.stringify(item1.disabled_list)+'}) return o'
                  }
                  session4.run(query4).then(function(result4) {
                    console.log('New plan created');
                  })
                })
              })
            })
          })
          res.send('Data added successfully');
        }
        else{
            req.body.plan.stages.stage.map((item,index)=>{
            let session1 = driver.session();
            let query1 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+item.name+'"}) return m';
            session1.run(query1).then(function(result1) {
              if(result1.records.length == 0){
                let session2 = driver.session();
                let query2 = "match (a:project{key:'"+req.body.project.key+"'})<-[:plan_of]-(n:plan{key:'"+req.body.plan.key+"'}) merge (n)<-[:build_of]-(o:build{buildNo:'"+req.body.plan.stages.stage[0].jobs.job[0].build_Number+"',data:'"+JSON.stringify(req.body)+"'}) create (n)<-[:stage_of]-(m:stage{name:'"+item.name+"',score:0,build_state:'"+item.build_state+"'}) return m";
                session2.run(query2).then(function(result2) {
                  item.jobs.job.map((item1,index1)=>{
                      let session3 = driver.session();
                      let query3 = '';
                      if(item1.build_state == 'NotBuilt') {
                        query3 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+result2.records[0]._fields[0].properties.name+'"}) create (m)<-[:job_of]-(o:job{name:"'+item1.name+'",key:"'+item1.key+'",build_state:"'+item1.build_state+'",build_status:"'+item1.build_status+'",enabled_list:[],disabled_list:[]}) return o'
                      }
                      else {
                        query3 = 'match (a:project{key:"'+req.body.project.key+'"})<-[:plan_of]-(n:plan{key:"'+req.body.plan.key+'"})<-[:stage_of]-(m:stage{name:"'+result2.records[0]._fields[0].properties.name+'"})\
                        create (m)<-[:job_of]-(o:job{name:"'+item1.name+'",key:"'+item1.key+'",build_state:"'+item1.build_state+'",build_status:"'+item1.build_status+'",enabled_list:'+JSON.stringify(item1.enabled_list)+',disabled_list:'+JSON.stringify(item1.disabled_list)+'}) return o'
                      }
                      session3.run(query3).then(function(result3) {
                        console.log('New stages created');
                      })
                  })
                })
              }
              else{
                item.jobs.job.map((item1,index1)=>{
                let session2 = driver.session();
                let query2 = "match (a:project{key:'"+req.body.project.key+"'})<-[:plan_of]-(n:plan{key:'"+req.body.plan.key+"'})<-[:stage_of]-(m:stage{name:'"+item.name+"'})<-[:job_of]-(o:job{key:'"+item1.key+"'}) return o";
                session2.run(query2).then(function(result2) {
                  if(result2.records.length == 0){
                    let session3 = driver.session();
                    let query3 = '';
                    if(item1.build_state == 'NotBuilt') {
                      query3 = "match (a:project{key:'"+req.body.project.key+"'})<-[:plan_of]-(n:plan{key:'"+req.body.plan.key+"'})<-[:stage_of]-(m:stage{name:'"+item.name+"'}) merge (n)<-[:build_of]-(o:build{buildNo:'"+req.body.plan.stages.stage[0].jobs.job[0].build_Number+"',data:'"+JSON.stringify(req.body)+"'})\
                    create (m)<-[:job_of]-(p:job{name:'"+item1.name+"',key:'"+item1.key+"',build_state:'"+item1.build_state+"',build_status:'"+item1.build_status+"',enabled_list:[],disabled_list:[]}) return p";
                  }
                  else{
                    query3 = "match (a:project{key:'"+req.body.project.key+"'})<-[:plan_of]-(n:plan{key:'"+req.body.plan.key+"'})<-[:stage_of]-(m:stage{name:'"+item.name+"'}) merge (n)<-[:build_of]-(o:build{buildNo:'"+req.body.plan.stages.stage[0].jobs.job[0].build_Number+"',data:'"+JSON.stringify(req.body)+"'})\
                  create (m)<-[:job_of]-(p:job{name:'"+item1.name+"',key:'"+item1.key+"',build_state:'"+item1.build_state+"',build_status:'"+item1.build_status+"',enabled_list:"+JSON.stringify(item1.enabled_list)+",disabled_list:"+JSON.stringify(item1.disabled_list)+"}) return p";
                  }
                    session3.run(query3).then(function(result3) {
                      console.log('New jobs created');
                    })
                  }
                  else{
                    let session3 = driver.session();
                    let query3 = "match (a:project{key:'"+req.body.project.key+"'})<-[:plan_of]-(n:plan{key:'"+req.body.plan.key+"'})<-[:stage_of]-(m:stage{name:'"+item.name+"'})<-[:job_of]-(p:job{key:'"+item1.key+"'}) merge(n)<-[:build_of]-(o:build{buildNo:'"+req.body.plan.stages.stage[0].jobs.job[0].build_Number+"',data:'"+JSON.stringify(req.body)+"'})\
                    set p.build_state="+item1.build_state+",p.build_status="+item1.build_status+",p.enabled_list="+item1.enabled_list+",p.disabled_list="+item1.disabled_list+"return p";
                    session3.run(query3).then(function(result3) {
                      console.log('Job updated');
                    })
                  }
                })
                })
              }
            })
        })
        res.send('Data added successfully');
    }
  });
}
});
});

  app.use(function (req, res) {
    let err = new Error('resource not found');
    err.status = 404;
    return res.status(err.status).json({
      error: err.message
    });
  });

  app.use(function (err, req, res) {
    console.error('internal error in watch processor: ', err);
    return res.status(err.status || 500).json({
      error: err.message
    });
  });
  return app;
};

let setupMiddlewares = function(app) {
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  return app;
};

let setupWebpack = function(app) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');
  const webpackCompiler = webpack(webpackConfig);
  app.use(webpackHotMiddleware(webpackCompiler));
  app.use(webpackDevMiddleware(webpackCompiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {colors: true}
  }));
  return app;
};

let setupMongooseConnections = function() {
  const mongoose = require('mongoose');
  let mongoURL = 'mongodb://127.0.0.1:27017/CDAP';

  mongoose.connect(mongoURL);

  mongoose.connection.on('connected', function () {
    console.log('mongoose is now connected to ', mongoURL);


    mongoose.connection.on('error', function (err) {
      console.error('error in mongoose connection: ', err);
    });

    mongoose.connection.on('disconnected', function () {
      console.log('mongoose is now disconnected.');
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log(
          'mongoose disconnected on process termination'
          );
        process.exit(0);
      });
    });
  });
};

module.exports = {
  createApp,
  setupStaticRoutes,
  setupAppRoutes,
  setupRESTRoutes,
  setupMiddlewares,
  setupMongooseConnections,
  setupWebpack
};
