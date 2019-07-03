# excel-upload-reactjs
Excel file upload in React js  Component  using react state   and function .
In  this file firstly we are decalre variable in state then function handleChange event "event.target.files[0]"  , assign  this.setState({
          file: event.target.files[0],
          filetype:event.target.files[0].name,
          fileName:event.target.files[0].type,
         })  
         
         this.setState function change this state value React js 
