import React, {useState, useEffect} from "react";
import {Container, Form, TextArea} from "semantic-ui-react";
import Ad from "./Ad";
import Progress from "./Progress";
import API from "../api";
import moment from "moment";
import {FaCheck} from "react-icons/fa";
import html2canvas from "html2canvas";

const Dashboard = () => {

    const [text, setText] = useState("");
    const [originialText, setOriginalText] = useState("");
    const [updateDate, setUpdateDate] = useState("");
    const [changed, setChange] = useState(true);


    const handleKeyPress = (event) => {
        setChange(false)
        if (event.metaKey && event.keyCode === 83) {
            API.postData(text)
                .then(d => d.json())
                .then((data) => {
                    if(data){
                        setChange(true);
                        setOriginalText(data.text);
                        setUpdateDate(data.updated);
                    }
            })
            event.preventDefault()
        }
        return false;
    };

    useEffect(() => {
        API.getWords(moment().format("DD-MM-YY"))
            .then(d => d.json())
            .then(({data}) => {
                if(data){
                    setText(data.text);
                    setOriginalText(data.text);
                    setUpdateDate(data.updated)
                }

            })
    }, [])

    return (
        <Container >
            <Ad/>
            <div id={'form'}>
            <Progress count={originialText && originialText.split(" ").filter(e => e.length).length} />
            <Form>
                <TextArea
                    dir="rtl"
                    onKeyDown={handleKeyPress}
                    placeholder='Enter text here....'
                    onChange={({target}) => setText(target.value)}
                    value={text}
                />
                <div className={"info"}>
                    <p>{`Saved
                         ${originialText && originialText.split(" ").filter(e => e.length).length} at
                        ${moment(updateDate).format("HH:MM")}`}
                        {changed && <FaCheck color={"green"} style={{marginLeft: 5}}/>}
                    </p>
                    <span>{text.split(" ").filter(e => e.length).length} words
                    </span>
                </div>
            </Form>
            </div>
        </Container>
    )
};

export default Dashboard;
