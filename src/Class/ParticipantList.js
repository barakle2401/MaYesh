import React from "react"
import "./Class.css"
import IconCross from "../NetflixSlider/components/Icons/IconCross";

class ParticipantList extends React.Component
{
    partiList()
    {
        if(this.props.list.length <= 0)
            return <p>     
                    <button className="closeParticiList" onClick={this.props.func}>
                        <IconCross/>
                    </button>
                    אין עדיין משתתפים בקורס זה
                 </p>
        const list = this.props.list.map((participant, key) => {
            return(
                <div>
                    <div className = "participant">
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">{participant.name}</div>
                        </div>
                        <img  className = "partimg" src = {participant.img}/>
                    </div>   
                </div>

            ) 
        })
        return(
            <div>
                    <p>:רשימת משתתפים
                    <button className="closeParticiList" onClick={this.props.func}>
                        <IconCross/>
                    </button>
                    </p>
                    {list}
                
            </div>
        )
    }


    partiListForManager()
    {
        if(this.props.list.length <= 0)
            return <p>     
            <button className="closeParticiList" onClick={this.props.func}>
                <IconCross/>
            </button>
            אין עדיין משתתפים בקורס זה
         </p>
        const list = this.props.list.map((participant, key) => {
            let url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + participant.email + "&tf=1"
            return(
                <div>
                    <div className = "participant">
                        <div className = "participantDetails" key = {participant.id}>
                            <div className = "prtiItem">
                                <div>{participant.name}</div> 
                                <div>{participant.phone}</div>
                                <div className="divSendEmail" onClick={()=>window.open(url,"_blank","toolbar=yes,menubar=no,titlebar=no,scrollbars=no,resizable=no,status=no,bottom=0,right=50,width=400,height=400")}>{participant.email}</div>
                            </div>
                            <img  className = "partimg" src = {participant.img}/>
                        </div>
                    </div>
                </div>
            ) //links to gmail and whatsapp
        })
        return(
            <div>
                    <p>:רשימת משתתפים
                    <button className="closeParticiList" onClick={this.props.func}>
                        <IconCross/>
                    </button>
                    </p>
                    {list}
            </div>
        )
    }

    render()
    {
        return(
            <div className = "particiListDiv">
                {this.props.manager ? <div>{this.partiListForManager()}</div> : <div>{this.partiList()}</div>}
            </div>
        )
    }
}


export default ParticipantList