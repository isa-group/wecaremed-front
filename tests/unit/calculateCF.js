let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const mongoose = require("mongoose");
const axios = require("axios")
require("dotenv").config();

chai.use(chaiHttp);
const url = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000/api/v1/';

let projectId = new mongoose.Types.ObjectId();

describe('Create a project: ', () => {
  it('should create a project', (done) => {
    chai.request(url)
      .post('projects')
      .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
      .send({
        _id: projectId,
        name: "CI PROJECT",
        from: new Date(2022, 3, 0),
        to: new Date(2024, 3, 29),
        callId: "AJFND93MD",
        proposalId: "JD973J39DK",
        initialCF: 0,
        currentCF: 0,
        publicOnSiteEventsNumber: 1,
        publicOnSiteEventsAveragePhysicalParticipants: 100,
        publicOnSiteEventsAverageNonLocalPhysicalParticipants: 70,
        publicOnSiteEventsAverageDuration: 2,
        publicHybridEventsNumber: 2,
        publicHybridEventsAveragePhysicalParticipants: 100,
        publicHybridEventsAverageNonLocalPhysicalParticipants: 80,
        publicHybridEventsAverageVirtualParticipants: 50,
        publicHybridEventsAverageDuration: 2,
        publicHybridEventsAverageHoursPerDays: 8,
        publicVirtualEventsNumber: 1,
        publicVirtualEventsAverageVirtualParticipants: 150,
        publicVirtualEventsAverageDuration: 6,
        internalOnSiteEventsNumber: 2,
        internalOnSiteEventsAveragePhysicalParticipants: 15,
        internalOnSiteEventsAverageNonLocalPhysicalParticipants: 10,
        internalOnSiteEventsAverageDuration: 1,
        internalHybridEventsNumber: 2,
        internalHybridEventsAveragePhysicalParticipants: 15,
        internalHybridEventsAverageNonLocalPhysicalParticipants: 10,
        internalHybridEventsAverageVirtualParticipants: 5,
        internalHybridEventsAverageDuration: 1,
        internalHybridEventsAverageHoursPerDays: 4,
        internalVirtualEventsNumber: 10,
        internalVirtualEventsAverageVirtualParticipants: 20,
        internalVirtualEventsAverageDuration: 4,
        participatedOnSiteEventsNumber: 5,
        participatedOnSiteEventsAverageParticipants: 1,
        participatedOnSiteEventsAverageDuration: 3,
      })
    .end(function(err,res) {
      console.log(res.body)
      projectId = res.body._id
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Create a partner: ', () => {
  it('should create a partner', (done) => {
  chai.request(url)
    .post('partners')
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .send({
      _id: new mongoose.Types.ObjectId(),
      name: "TEST PARTNER",
      country: "Greece",
      employeesPersonMonths: 3,
      externalExpertsPersonMonths: 10,
      employeesWorkingWPP: 2,
      seasonalEmployees: 1,
      externalExperts: 1,
      coordinator: true,

      pcsBoughtDuringProject: 0,
      pcsFlatScreenBoughtDuringProject: 0,
      laptopsBoughtDuringProject: 1,
      flatScreensBoughtDuringProject: 0,
      printersBoughtDuringProject: 0,
      copyMachinesBoughtDuringProject: 0,

      totalWeightOtherElectricalEquipment: 0.001,

      totalWeightVehicles: 2,
      totalWeightMachines: 0.05,
      totalWeightFurniture: 0.02,
      project: projectId
    })
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Create printable deliverables: ', () => {
  it('should create two printable deliverables', (done) => {
  chai.request(url)
    .post('printableDeliverables')
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .send({
      _id: new mongoose.Types.ObjectId(),
      deliverableType: "Digital or written communication",
      deliverableName: "Poster",
      copies: 5,
      avgPagesPerCopy: 1,
      size: "A0",
      project: projectId
    })
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
    });

  chai.request(url)
    .post('printableDeliverables')
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .send({
      _id: new mongoose.Types.ObjectId(),
      deliverableType: "Method",
      deliverableName: "Report",
      copies: 10,
      avgPagesPerCopy: 50,
      size: "A4",
      project: projectId
    })
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('Calculate CF for the project: ', () => {
  it('should calculate CF for the project and assert that the calculated CF is correct', (done) => {
  chai.request(url)
    .put('projects/calculateCF/' + projectId)
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      expect(res.body.initialCF).to.equal(99.36)
      done();
    });
  });
});

describe('Delete the project: ', () => {
  it('should delete the project', (done) => {
  chai.request(url)
    .delete('projects/' + projectId)
    .auth(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD)
    .end(function(err,res) {
      console.log(res.body)
      expect(res).to.have.status(200);
      done();
    });
  });
});
