import React, { Component } from "react";
import firebase from "../Firebase/FireBase.js";
import './FormStyle.css'
import FileUploader from "react-firebase-file-uploader"; // https://www.npmjs.com/package/react-firebase-file-uploader
import { Redirect } from 'react-router';
import Alert from 'react-s-alert';

function FavoritesCategeory(props) {
  // get the real category json from the DB

  let categories = [];
  categories = props.categories;
  return (
      <div className="BigfavoritesCat">
        {categories.map((object, i) => {
          let strID = "ch" + i;
          return (
              <div key={i} className="favoritesCat">
              <input type="checkbox" id={strID} value={object.name} onChange={props.func}/>
            <label htmlFor={strID}>
            <img src={object.img} />
            <div className="textdivEdit">
            {object.name}
            </div>
            </label>
            </div>
            );
          })}
      </div>
  );
}

class CompleteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:props.user.id,
      email:props.user.email,
      name:props.user.name,
      phone:props.user.phone,
      img:props.user.img,
      favoriteCat:props.user.favoriteCat,
      listOfSignInClass:props.user.listOfSignInClass,
      progress:[]

    };;
  let endProses =false;
  let whyPhone = false;
  this.handleChange = this.handleChange.bind(this);
  this.AddUser = this.AddUser.bind(this);
  this.handleUploadError = this.handleUploadError.bind(this);
  this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
  this.hhandleProgress = this.handleProgress.bind(this);
  }

  handleChange(e) {
    
    
    if(e.target.type == "checkbox"){
      let i = e.target.id.substring(2)
      let tempFavoriteCat = this.state.favoriteCat;
      if(tempFavoriteCat[i] == undefined)
        tempFavoriteCat[i] = e.target.value;
      else
        tempFavoriteCat[i] = null
      this.setState({favoriteCat:tempFavoriteCat})
    }
    else{
      this.setState({[e.target.name]: e.target.value});
    }
  }
 

  AddUser(){
    if(this.state.name == "" || this.state.phone == ""){
      Alert.warning("חובה להזין שם ומספר פלאפון");
      return;
    }
    
    firebase.database().ref('/Users/' + this.state.id).set(this.state);
    this.endProses =true;
    this.setState({});
    window.scrollTo(0, 0);
    Alert.success("הרישום בוצע בהצלחה");
  }

  handleUploadError (error) {
    alert("Upload Error: " + error);
};
handleProgress = progress => this.setState({ progress:(progress+'%') });
handleUploadSuccess(filename) {
firebase
  .storage()
  .ref("usersImg")
  .child(filename)
  .getDownloadURL()
  .then(url => this.setState({ img: url ,progress:[]}));
};

  render() {
    let divWidth = {
      maxWidth: '35%'
    };
  let inputWidth ={};
  if(window.innerWidth < 500){ // if it is phone set the width to 100%
      divWidth.maxWidth = '100%';
      divWidth.width = '95%';
      divWidth.minWidth = '10%';
      inputWidth.width ='50%';
  }
    return (
        <div className="completeReg" style ={divWidth}>
        <form className="edit">
        <h1>ברוכים הבאים למה יש</h1>
        <h4>לפני שנתחיל נשמח לכמה פרטים קטנים</h4>
        <label>   
        <div className="imguserc">
          <img className="user_e" src={this.state.img}/>
          <div className="useret">
            {this.state.progress}שנה תמונה
          </div> 
        </div>
          <FileUploader
            hidden
            accept="image/*"
            randomizeFilename
            storageRef={firebase.storage().ref("usersImg")}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          </label>

        <label>
        <span className="labl">
        :שם מלא
        </span>
        <input style={inputWidth} type="text" name="name" value={this.state.name} onChange={this.handleChange}></input>
        </label>
          
        <label>
        <span className="labl">
        <span className="whyPhone" onClick={()=>{this.whyPhone = !this.whyPhone;this.setState({})}}>?</span>
        {this.whyPhone? (<div className="whyPhone">
          אנחנו לא רוצים את הפרטים שלך סתם, אל חשש
          אנחנו רוצים שלמארגני המפגש יהיה דרך לוודא שכולם מגיעים
          ולעדכן בפרטים
          <br/>
          <span className="whyPhoneGetIt"  onClick={()=>{this.whyPhone = false;this.setState({})}}>הבנתי</span>
        </div>)
        :null}
        :הפלאפון שלך
        </span>
        <input style={inputWidth} type="tel" pattern="[0-9]{9}" name="phone" value={this.state.phone} onChange={this.handleChange}></input>
        </label>
        <br/>
        <label>
        <span className="lablfav">
        בחר קטגוריות מעדפות
        <br/>
        <span className="spanfavoriteCat">
        לפי זה נדע להראות את החוגים שהכי מתאימים לך
        </span></span>
        <FavoritesCategeory func={this.handleChange} categories={this.props.categoryList}/>
        </label>
        <input className="greenBtnEditForm" type="button" value="המשך" onClick={this.AddUser}/>
      </form>
      {this.endProses  ? (
            <Redirect to={{pathname: this.props.location, state:{isLogin:true,user:this.state.user}}}/>
          ):null}
        </div>
    );
  }
}

export default CompleteRegistration;
