import React, { Component } from "react";
import axios from 'axios';
import ScheduleReport from "./ScheduleReport";
import {BaseUrlApi} from './sesionstart';
import ViewReport from "./ViewReport";
import {MDBBtn,MDBContainer,  MDBInput } from 'mdbreact';
import { Form, Dropdown, Modal, ModalHeader, ModalBody, ModalFooter , DropdownMenu, DropdownToggle, DropdownItem, Button} from "reactstrap";
import { MDBDataTable} from 'mdbreact';
import { toast, ToastContainer } from "mdbreact";
import "./report.css";

class HOMEPROGRAM extends Component {
  constructor(props) {
    super(props);
    
    this.toggleSchedule = this.toggleSchedule.bind(this);
    this.toggleReport = this.toggleReport.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
   this.handleChange = this.handleChange.bind(this);
   this.UploadFile = this.UploadFile.bind(this);
   
    this.state = {
      ApiResponse:[],
      DXC_Calendar:[],
      ApiResponse: null,
      WeekendDate:"",
        file: null,
        fileName: null,
        Imagebytestring: null,
        filetype: null,
        fileCHECK:true,
        selectedfile: null,
        UploadFiletype:null,
        SelectFiletype:null,
        Message:null,
        modalUpload:false,
        actions: [],
        value: "Select Weekend Date",
        dropdownOpen: false,
        ProgramName:"",
        ProjectName:"",
        AddUserData: {
          "returnStatus": "sample string 12"
        },
       
        datavalue: '',
        formIsValid: true,        
      ProjectID:"",
      TotalRevenueBudget:"",
      TotalCostBudget:"",
      FinishedDate:"",
      tableRows:[],      
      Program_Id:"",
      selectedfile: null,
      actions: [],
      Programs:[],
      Projects:[],
      modal1: false,
      modal2: false,
      modal4: false,
    };
  }
  notify (type, Message) {
    console.log("this.state.Messag", this.state.Messag)
    console.log("Message", Message )
    if (type === "info")
    { toast.info( " info"+ Message , { closeButton: false });
    }
    else if 
    (type === "success") 
    { toast.success( "success"+ Message , { closeButton: false });
    }
    else if (type === "warning")
    { toast.error( " warning "+ Message , { closeButton: false });
    }
    }
  select = event => {
    this.setState({
      dropdownopen: !this.state.dropdownopen,
      value: event.target.innerText,
    });
  };
  
  handleChange(event) {
    let   filetype = event.target.files[0].name;
    filetype= filetype.split(".");
    console.log("filetypew12", filetype)
      this.setState({
      UploadFiletype: filetype[1],
       file: event.target.files[0],
       filetype:event.target.files[0].type,
       fileName:event.target.files[0].name,
      })
      console.log("filetype", event.target.files[0])  
   }
   submitHandler = event => {
     event.preventDefault();
     event.target.className += " was-validated";
   };
   changeHandler = event => {
     this.setState({ [event.target.name]: event.target.value });
   };
   onChange(e){
     this.setState({[e.target.name] : e.target.value});
 }  

 UploadFile() {
  let {fileName, filetype, file, UploadFiletype , SelectFiletype , ProjectID, ProgramName,ProjectName, WeekendDate} = this.state; 
  var otherInfo = "&WeekendDate=" + WeekendDate + "&ProgramName=" + ProgramName + "&ProjectName=" + ProjectName;
  console.log( "SelectFiletype" , SelectFiletype)
  console.log( "UploadFiletype" , UploadFiletype)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", fileName);
  formData.append("filetype", filetype); 
  
  if( SelectFiletype == 1 && UploadFiletype != null){
  if( UploadFiletype == "mpp" ){
  var ApiMethod = "ProjectMaster/UploadFiles?ProjectID=" + ProjectID + otherInfo;
  var Method= "post";
  BaseUrlApi( ApiMethod ,Method, formData )
  .then((result) => {
  this.notify("success", result.Message);
  this.setState(prevState => ({
  ApiResponse: result.Message,
  Message: result.Message })); 
  }) }
  else{
  this.notify("warning", "File format are not mpp");
  this.setState(prevState => ({
  visible2: true,
  Message: "File format are not mpp",
  })); 
  }
  }
  else if(SelectFiletype == 2 && UploadFiletype != null){
  if( UploadFiletype == "xlsx" || UploadFiletype == "xls"){
  var ApiMethod = "ProjectMaster/UploadFiles?ProjectID=" + ProjectID + otherInfo ;
  var Method= "post";
  BaseUrlApi( ApiMethod , Method, formData )
  .then((result) =>
  {this.setState ({ ApiResponse: result.Message,
  Message: result.Message }) }
  );
  this.notify("success");
  this.setState(prevState => ({ visible1: true })); 
  }
  else{ this.setState(prevState => ({ visible3: !prevState.visible3 , Message: " File format are not xlsx",
  })); 
  this.notify("warning");
  }
  }
  }

  toggleSchedule() {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }));
  }
  toggleReport() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
  }
  toggleClose() {
    this.setState(prevState => ({
      modal4: !prevState.modal4
    }));
  }
    toggleUpload(ProjectID, ProgramName,ProjectName) {
    console.log("toggleUpload", ProgramName )
    this.setState(prevState => ({
      ProjectID:ProjectID,
      ProgramName:ProgramName,
      ProjectName:ProjectName,
      modalUpload: !prevState.modalUpload
    }));
  }

  componentWillMount()
  {
    this.refreshData();
    this.GetProgramData();  
  }    

  GetProgramData = async(Program_Id) =>  {               
                    if (Program_Id == "")
                    {
                      var ApiMethod = "ProjectMaster/GetProjectMaster";
                      var Method= "get";
                      var formData = "";
                      BaseUrlApi( ApiMethod ,Method, formData )
                      .then(response => response.data)  
                      .then(data => {
                            this.setState({ Projects: data.result,
                              datalengthProject : data.result.length
                        })
                      }) 
                    }
                    else
                    {    
                       var ApiMethod = "ProjectMaster/GetAllProjects?ProgramID= " +Program_Id;
                       var Method= "get";
                       var formData = "";
                       BaseUrlApi( ApiMethod ,Method, formData )
                                .then(data => {
                                                   this.setState({ Projects: data.result,
                                                    Program_Id:Program_Id,
                                                    Projectstotal: data.result.Costbudget,
                                                    datalengthProject : data.result.length
                                                 })
                                                 console.log("data program " , data.result )
                      
                                                })
                              .then(async () => {
                                  this.setState({ tableRows: this.assemblePosts(), isLoading: false });
                                                   var a = this.state.tableRows.Costbudget;
                                                    var length = this.state.tableRows.length;
                                                 let Cost = 0;
                                                  let price = 0;
                                                     for (var i=0; i<length; i++)
                                                      {
                                                          Cost  += this.state.tableRows[i].Costbudget;
                                                          price  += this.state.tableRows[i].RevenueBudget;
                                                      }
                    this.setState({ TotalCostBudget: Cost, TotalRevenueBudget: price});
                   

              }); 
                    }
                  }
  refreshData=async() => {
   

    var ApiMethod = "ProgramMaster/GetProgramMaster";
    var Method= "get";
    var formData = "";
    BaseUrlApi( ApiMethod ,Method, formData )
      .then(data => {
            this.setState({ Programs: data.result,
              datalengthProgram : data.result.length
        }) 
      })
      var ApiMethod = "ProjectMaster/GetDXC_Calendar";
      var Method= "get";
      var formData = "";
      BaseUrlApi( ApiMethod ,Method, formData )
        .then(data => {
              this.setState({ DXC_Calendar: data.result,
                datalengthProgram : data.result.length
          }) 
        })

    }
  assemblePosts = () => {
    let posts = this.state.Projects.map(post => {
      return {
        ProjectName: post.ProjectName, 
        Finishdate: post.FinishDate, 
        Costbudget: post.Costbudget, 
        RevenueBudget: post.RevenueBudget, 
        ScheduleReport:<Button color="primary" onClick={this.toggleSchedule}><span class="mdi mdi-calendar-clock" /></Button>,
        ViewReport:<Button color="primary" onClick={this.toggleReport}><span class="mdi mdi-file-document" /></Button>,
        Upload:        
        <Button color="primary" onClick={this.toggleUpload.bind(this, post.ProjectID , post.ProgramName, post.ProjectName)}><span class="mdi mdi-cloud-upload" /></Button>,
       Closed:<Button color="primary" onClick={this.toggleClose}><span class="mdi mdi-close-outline" />
        </Button>
      };
    });
    return posts;
}

  render() {
    const data = {
      columns: [
        {label: "Project Name", field: "ProjectName"},
        {label: "Finish Date",field: "Finishdate"},
        {label: "Cost Budget",field: "Costbudget"},
        {label: "Revenue Budget",field: "RevenueBudget"},
        {label: "Schedule Report",field: "Schedule Report"},
        {label: "View Report",field: "View Report"},
        {label: "Upload",field: "Upload"},
        {label: "Closed",field: "Closed"},
    
      ], rows: this.state.tableRows};
    return (
      <React.Fragment>
        {/* <div class="content-wrapper"> */}
         <div class="row">
            <div class="col-lg-12 grid-margin">
              <div class="card">
                <div class="card-body">
              <select className="drop-down-custom" name="Program_Id"
                          onChange={e => {
                            let { Program_Id } = this.state;
                            Program_Id = e.target.value;
                            this.setState({ Program_Id });
                            this.GetProgramData(Program_Id);
                          }}
                        >
                           <option className="form-control drop-down-option" value="">  Select program</option>
                          {this.state.Programs.map(f => {
                            return (
                              <option className="form-control drop-down-option" value={f.ProgramID}>
                          {f.ProgramName} </option>
                            );})}
                        </select>
                        <br/>
                        <br/>
                  <div className="table-responsive">
                    <table class="table table-bordered">
                        <tr>  <td>Total Revenue Budget</td> <td>Total Cost Budget</td> <td>Finished Date</td></tr>
                      <tbody>
                        <tr>
                          <td>{this.state.TotalRevenueBudget}</td>
                          <td>{this.state.TotalCostBudget}</td>
                          <td>{this.state.FinishedDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title" />
 
                  <div class="table-responsive">
                    <h5> Projects</h5>
                               <MDBDataTable striped bordered  hover  data={data} />
                  </div>
                </div>
              </div>
              <Modal
                isOpen={this.state.modal1}
                toggle={this.toggleSchedule}
                className="modal-dialog modal-md"
              >
                <ModalBody>
                  <ScheduleReport />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleSchedule}>
                    Update
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleSchedule}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
              <Modal
                isOpen={this.state.modal2}
                toggle={this.toggleReport}
                className="modal-dialog modal-md"
              >
                <ModalBody>
                  <ViewReport />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleReport}>
                    Update
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleReport}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            
              <Modal
                isOpen={this.state.modal4}
                toggle={this.toggleClose}
                className="modal-dialog modal-md"
              >
                <ModalHeader toggle={this.toggleClose}>Modal title</ModalHeader>
                <ModalBody>
                  Closed
                  {/* <Upload /> */}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleClose}>
                    Update
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggleClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>

              <Modal
                isOpen={this.state.modalUpload}
                toggle={this.toggleUpload}
                className="modal-dialog modal-md"
              >
                <ModalBody>
                <ToastContainer hideProgressBar={true}newestOnTop={true}autoClose={4000}/>

                <Form
          className="needs-validation"
          noValidate
          onSubmit={this.submitHandler}
        >
  
              <select
                // value={this.state.city}
                onChange={e => {
                  let { WeekendDate } = this.state;
                  WeekendDate = e.target.value;
                  this.setState({ WeekendDate });
                }}
                type="text" id="defaultFormRegisterPasswordEx4" className="form-control" name="WeekendDate" placeholder="City" required
              >
                <option value="">select</option>
            {  this.state.DXC_Calendar.map( (d)=>
                <option key={d.Cal_ID} > {d.WeekEndDate}</option>
                )}
              </select>
              <div className="invalid-feedback">
                Please provide a valid WeekendDate.
              </div>
        <hr />
            <MDBInput
                value="1" type="radio" id="materialFormRegisterConfirmEx3" name="SelectFiletype"
                label="MPP File" required
                onChange={e => {
                  let { SelectFiletype } = this.state;
                  SelectFiletype = e.target.value;
                  this.setState({ SelectFiletype });
                }}
              >
               <div className="invalid-feedback">  Please select. </div> 
              </MDBInput>
              <MDBInput className="loginwidth"  value="2" type="radio"
                id="materialFormRegisterConfirmEx3" name="SelectFiletype"
                label="Upload 1028"  required
                onChange={e => {
                  let { SelectFiletype } = this.state;
                  SelectFiletype = e.target.value;
                  this.setState({ SelectFiletype });
                }}
                >
                <div className="invalid-feedback">  Please select.  </div>
              </MDBInput>
              <MDBInput className="loginwidth"
                  type="file"
                id="materialFormRegisterConfirmEx3"
                required
                onChange={this.handleChange} 
                >
                <div className="invalid-feedback">
                Please select.
                </div>
              </MDBInput>
          <hr />
          <MDBBtn onClick={this.UploadFile} color="success"   rounded className="btn-block z-depth-1" type="submit">  Upload  </MDBBtn>
          <hr/>
          {this.state.ApiResponse}
        </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleUpload}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
           </React.Fragment>
    );
  }
}

export default HOMEPROGRAM;
