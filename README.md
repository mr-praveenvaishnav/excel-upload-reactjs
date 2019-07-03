# excel-upload-reactjs
Excel file upload in React js  Component  using react state   and function .
In  this file firstly we are decalre variable in state then function handleChange event "event.target.files[0]"  , assign  this.setState({
          file: event.target.files[0],
          filetype:event.target.files[0].name,
          fileName:event.target.files[0].type,
         })  
         
         this.setState function change this state value React js 
         
         
in this file notify  function are also descirbe how to use notification in react js 


import { toast, ToastContainer } from "mdbreact";

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
    
