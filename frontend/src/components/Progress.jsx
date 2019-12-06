import React from "react";
import moment from "moment";
import {FaPrint} from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

moment.locale('arabic', {
    months : 'كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_تشرين الثاني_كانون الأول'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : ["الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت", "الاحد"].reverse(),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
});

moment.locale('ru');

const Progress = ({count}) => {



    const  daysInThisMonth = () => {
        var now = new Date();
        const days  =  new Date(now.getFullYear(), now.getMonth() +1, 0).getDate();

        const result = [];
        for (let i = 0; i< days; i++){
            const currentDay  =  i === new Date().getDay();
            const  isActive = i <= new Date().getDay();

            result.push({
                isActive,
                currentDay,
                index: i,
                text: currentDay ? `${count} words ${moment().format("dddd, MMMM DD YYYY")}` :
                    isActive ? `0 words ${moment().subtract(i + 1, "days").format("dddd, MMMM DD YYYY")}` :
                        `0 words ${moment().add(i - 3, "days").format("dddd, MMMM DD YYYY")}`

                })
        }

        return result;

    }

    const generatePDf = () => {
        html2canvas(document.querySelector("#form")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            window.open(pdf, "_blank")
        });
    }

    return (
        <>
            December 2019

            {
                <div style={{display: "flex", marginTop: 20, marginBottom: 20}}>
                    <FaChevronLeft/>
                    {daysInThisMonth().map(e => (<div
                        className={`day-slider ${e.isActive && "day-slider-active"}`}
                        data-tip={e.text}
                        >
                            { e.currentDay  && !!count &&  <hr/>}
                            <ReactTooltip place="top" type="dark" effect="float"/>
                        </div>
                        ))}
                    <FaChevronRight/>
                </div>
            }
        <div style={{display: "flex"}}>
        <h1 className={"time"}>
            {moment().format("dddd, MMMM DD YYYY")}
        </h1>
        <FaPrint
         onClick={generatePDf}
         style={{
            marginLeft: 11,
            marginTop: 13,
            cursor: "pointer"
        }} />
        </div>


        </>
    )
};

export default Progress;
