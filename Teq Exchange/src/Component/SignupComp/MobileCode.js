import React, { Component } from 'react';
import '../../Screens/Signup/signup.css'

class MobileCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        }
        this.countrCodey = this.country.bind(this)
    }

    country(value) {
        console.log('this.country', value)
        this.props.countryVal(value)
    }

    componentWillMount() {
        const { countryCode } = this.props;
        console.log('countryCode', countryCode)
        this.setState({ val: countryCode })
    }

    componentWillReceiveProps(props) {
        const { countryCode } = props;
        console.log('countryCode', countryCode)
        this.setState({ val: countryCode })
    }

    render() {
        const { val } = this.state;
        return (
            <select className={'Country_Code_Select'} name="countryCode" onChange={(e) => this.country(e.target.value)}>
                <option data-countryCode="GB" seleted={val === "44"} value="44" Selected>UK (+44)</option>
                <option data-countryCode="US" seleted={val === "1"} value="1">USA (+1)</option>
                <optgroup label="Other countries">
                    <option data-countryCode="DZ" selected={val === "213"} value="213">Algeria (+213)</option>
                    <option data-countryCode="AD" selected={val === "376"} value="376">Andorra (+376)</option>
                    <option data-countryCode="AO" selected={val === "244"} value="244">Angola (+244)</option>
                    <option data-countryCode="AI" selected={val === "1264"} value="1264">Anguilla (+1264)</option>
                    <option data-countryCode="AG" selected={val === "1268"} value="1268">Antigua &amp; Barbuda (+1268)</option>
                    <option data-countryCode="AR" selected={val === "54"} value="54">Argentina (+54)</option>
                    <option data-countryCode="AM" selected={val === "374"} value="374">Armenia (+374)</option>
                    <option data-countryCode="AW" selected={val === "297"} value="297">Aruba (+297)</option>
                    <option data-countryCode="AU" selected={val === "61"} value="61">Australia (+61)</option>
                    <option data-countryCode="AT" selected={val === "43"} value="43">Austria (+43)</option>
                    <option data-countryCode="AZ" selected={val === "994"} value="994">Azerbaijan (+994)</option>
                    <option data-countryCode="BS" selected={val === "1242"} value="1242">Bahamas (+1242)</option>
                    <option data-countryCode="BH" selected={val === "973"} value="973">Bahrain (+973)</option>
                    <option data-countryCode="BD" selected={val === "880"} value="880">Bangladesh (+880)</option>
                    <option data-countryCode="BB" selected={val === "1246"} value="1246">Barbados (+1246)</option>
                    <option data-countryCode="BY" selected={val === "375"} value="375">Belarus (+375)</option>
                    <option data-countryCode="BE" selected={val === "32"} value="32">Belgium (+32)</option>
                    <option data-countryCode="BZ" selected={val === "501"} value="501">Belize (+501)</option>
                    <option data-countryCode="BJ" selected={val === "229"} value="229">Benin (+229)</option>
                    <option data-countryCode="BM" selected={val === "1441"} value="1441">Bermuda (+1441)</option>
                    <option data-countryCode="BT" selected={val === "975"} value="975">Bhutan (+975)</option>
                    <option data-countryCode="BO" selected={val === "591"} value="591">Bolivia (+591)</option>
                    <option data-countryCode="BA" selected={val === "387"} value="387">Bosnia Herzegovina (+387)</option>
                    <option data-countryCode="BW" selected={val === "267"} value="267">Botswana (+267)</option>
                    <option data-countryCode="BR" selected={val === "55"} value="55">Brazil (+55)</option>
                    <option data-countryCode="BN" selected={val === "673"} value="673">Brunei (+673)</option>
                    <option data-countryCode="BG" selected={val === "359"} value="359">Bulgaria (+359)</option>
                    <option data-countryCode="BF" selected={val === "226"} value="226">Burkina Faso (+226)</option>
                    <option data-countryCode="BI" selected={val === "257"} value="257">Burundi (+257)</option>
                    <option data-countryCode="KH" selected={val === "855"} value="855">Cambodia (+855)</option>
                    <option data-countryCode="CM" selected={val === "237"} value="237">Cameroon (+237)</option>
                    <option data-countryCode="CA" selected={val === "1"} value="1">Canada (+1)</option>
                    <option data-countryCode="CV" selected={val === "238"} value="238">Cape Verde Islands (+238)</option>
                    <option data-countryCode="KY" selected={val === "1345"} value="1345">Cayman Islands (+1345)</option>
                    <option data-countryCode="CF" selected={val === "236"} value="236">Central African Republic (+236)</option>
                    <option data-countryCode="CL" selected={val === "56"} value="56">Chile (+56)</option>
                    <option data-countryCode="CN" selected={val === "86"} value="86">China (+86)</option>
                    <option data-countryCode="CO" selected={val === "57"} value="57">Colombia (+57)</option>
                    <option data-countryCode="KM" selected={val === "269"} value="269">Comoros (+269)</option>
                    <option data-countryCode="CG" selected={val === "242"} value="242">Congo (+242)</option>
                    <option data-countryCode="CK" selected={val === "682"} value="682">Cook Islands (+682)</option>
                    <option data-countryCode="CR" selected={val === "506"} value="506">Costa Rica (+506)</option>
                    <option data-countryCode="HR" selected={val === "385"} value="385">Croatia (+385)</option>
                    <option data-countryCode="CU" selected={val === "53"} value="53">Cuba (+53)</option>
                    <option data-countryCode="CY" selected={val === "9039"} value="90392">Cyprus North (+90392)</option>
                    <option data-countryCode="CY" selected={val === "357"} value="357">Cyprus South (+357)</option>
                    <option data-countryCode="CZ" selected={val === "42"} value="42">Czech Republic (+42)</option>
                    <option data-countryCode="DK" selected={val === "45"} value="45">Denmark (+45)</option>
                    <option data-countryCode="DJ" selected={val === "253"} value="253">Djibouti (+253)</option>
                    <option data-countryCode="DM" selected={val === "1809"} value="1809">Dominica (+1809)</option>
                    <option data-countryCode="DO" selected={val === "1809"} value="1809">Dominican Republic (+1809)</option>
                    <option data-countryCode="EC" selected={val === "593"} value="593">Ecuador (+593)</option>
                    <option data-countryCode="EG" selected={val === "20"} value="20">Egypt (+20)</option>
                    <option data-countryCode="SV" selected={val === "503"} value="503">El Salvador (+503)</option>
                    <option data-countryCode="GQ" selected={val === "240"} value="240">Equatorial Guinea (+240)</option>
                    <option data-countryCode="ER" selected={val === "291"} value="291">Eritrea (+291)</option>
                    <option data-countryCode="EE" selected={val === "372"} value="372">Estonia (+372)</option>
                    <option data-countryCode="ET" selected={val === "251"} value="251">Ethiopia (+251)</option>
                    <option data-countryCode="FK" selected={val === "500"} value="500">Falkland Islands (+500)</option>
                    <option data-countryCode="FO" selected={val === "298"} value="298">Faroe Islands (+298)</option>
                    <option data-countryCode="FJ" selected={val === "679"} value="679">Fiji (+679)</option>
                    <option data-countryCode="FI" selected={val === "358"} value="358">Finland (+358)</option>
                    <option data-countryCode="FR" selected={val === "33"} value="33">France (+33)</option>
                    <option data-countryCode="GF" selected={val === "594"} value="594">French Guiana (+594)</option>
                    <option data-countryCode="PF" selected={val === "689"} value="689">French Polynesia (+689)</option>
                    <option data-countryCode="GA" selected={val === "241"} value="241">Gabon (+241)</option>
                    <option data-countryCode="GM" selected={val === "220"} value="220">Gambia (+220)</option>
                    <option data-countryCode="GE" selected={val === "7880"} value="7880">Georgia (+7880)</option>
                    <option data-countryCode="DE" selected={val === "49"} value="49">Germany (+49)</option>
                    <option data-countryCode="GH" selected={val === "233"} value="233">Ghana (+233)</option>
                    <option data-countryCode="GI" selected={val === "350"} value="350">Gibraltar (+350)</option>
                    <option data-countryCode="GR" selected={val === "30"} value="30">Greece (+30)</option>
                    <option data-countryCode="GL" selected={val === "299"} value="299">Greenland (+299)</option>
                    <option data-countryCode="GD" selected={val === "1473"} value="1473">Grenada (+1473)</option>
                    <option data-countryCode="GP" selected={val === "590"} value="590">Guadeloupe (+590)</option>
                    <option data-countryCode="GU" selected={val === "671"} value="671">Guam (+671)</option>
                    <option data-countryCode="GT" selected={val === "502"} value="502">Guatemala (+502)</option>
                    <option data-countryCode="GN" selected={val === "224"} value="224">Guinea (+224)</option>
                    <option data-countryCode="GW" selected={val === "245"} value="245">Guinea - Bissau (+245)</option>
                    <option data-countryCode="GY" selected={val === "592"} value="592">Guyana (+592)</option>
                    <option data-countryCode="HT" selected={val === "509"} value="509">Haiti (+509)</option>
                    <option data-countryCode="HN" selected={val === "504"} value="504">Honduras (+504)</option>
                    <option data-countryCode="HK" selected={val === "852"} value="852">Hong Kong (+852)</option>
                    <option data-countryCode="HU" selected={val === "36"} value="36">Hungary (+36)</option>
                    <option data-countryCode="IS" selected={val === "354"} value="354">Iceland (+354)</option>
                    <option data-countryCode="IN" selected={val === "91"} value="91">India (+91)</option>
                    <option data-countryCode="ID" selected={val === "62"} value="62">Indonesia (+62)</option>
                    <option data-countryCode="IR" selected={val === "98"} value="98">Iran (+98)</option>
                    <option data-countryCode="IQ" selected={val === "964"} value="964">Iraq (+964)</option>
                    <option data-countryCode="IE" selected={val === "353"} value="353">Ireland (+353)</option>
                    <option data-countryCode="IL" selected={val === "972"} value="972">Israel (+972)</option>
                    <option data-countryCode="IT" selected={val === "39"} value="39">Italy (+39)</option>
                    <option data-countryCode="JM" selected={val === "1876"} value="1876">Jamaica (+1876)</option>
                    <option data-countryCode="JP" selected={val === "81"} value="81">Japan (+81)</option>
                    <option data-countryCode="JO" selected={val === "962"} value="962">Jordan (+962)</option>
                    <option data-countryCode="KZ" selected={val === "7"} value="7">Kazakhstan (+7)</option>
                    <option data-countryCode="KE" selected={val === "254"} value="254">Kenya (+254)</option>
                    <option data-countryCode="KI" selected={val === "686"} value="686">Kiribati (+686)</option>
                    <option data-countryCode="KP" selected={val === "850"} value="850">Korea North (+850)</option>
                    <option data-countryCode="KR" selected={val === "82"} value="82">Korea South (+82)</option>
                    <option data-countryCode="KW" selected={val === "965"} value="965">Kuwait (+965)</option>
                    <option data-countryCode="KG" selected={val === "996"} value="996">Kyrgyzstan (+996)</option>
                    <option data-countryCode="LA" selected={val === "856"} value="856">Laos (+856)</option>
                    <option data-countryCode="LV" selected={val === "371"} value="371">Latvia (+371)</option>
                    <option data-countryCode="LB" selected={val === "961"} value="961">Lebanon (+961)</option>
                    <option data-countryCode="LS" selected={val === "266"} value="266">Lesotho (+266)</option>
                    <option data-countryCode="LR" selected={val === "231"} value="231">Liberia (+231)</option>
                    <option data-countryCode="LY" selected={val === "218"} value="218">Libya (+218)</option>
                    <option data-countryCode="LI" selected={val === "417"} value="417">Liechtenstein (+417)</option>
                    <option data-countryCode="LT" selected={val === "370"} value="370">Lithuania (+370)</option>
                    <option data-countryCode="LU" selected={val === "352"} value="352">Luxembourg (+352)</option>
                    <option data-countryCode="MO" selected={val === "853"} value="853">Macao (+853)</option>
                    <option data-countryCode="MK" selected={val === "389"} value="389">Macedonia (+389)</option>
                    <option data-countryCode="MG" selected={val === "261"} value="261">Madagascar (+261)</option>
                    <option data-countryCode="MW" selected={val === "265"} value="265">Malawi (+265)</option>
                    <option data-countryCode="MY" selected={val === "60"} value="60">Malaysia (+60)</option>
                    <option data-countryCode="MV" selected={val === "960"} value="960">Maldives (+960)</option>
                    <option data-countryCode="ML" selected={val === "223"} value="223">Mali (+223)</option>
                    <option data-countryCode="MT" selected={val === "356"} value="356">Malta (+356)</option>
                    <option data-countryCode="MH" selected={val === "692"} value="692">Marshall Islands (+692)</option>
                    <option data-countryCode="MQ" selected={val === "596"} value="596">Martinique (+596)</option>
                    <option data-countryCode="MR" selected={val === "222"} value="222">Mauritania (+222)</option>
                    <option data-countryCode="YT" selected={val === "269"} value="269">Mayotte (+269)</option>
                    <option data-countryCode="MX" selected={val === "52"} value="52">Mexico (+52)</option>
                    <option data-countryCode="FM" selected={val === "691"} value="691">Micronesia (+691)</option>
                    <option data-countryCode="MD" selected={val === "373"} value="373">Moldova (+373)</option>
                    <option data-countryCode="MC" selected={val === "377"} value="377">Monaco (+377)</option>
                    <option data-countryCode="MN" selected={val === "976"} value="976">Mongolia (+976)</option>
                    <option data-countryCode="MS" selected={val === "1664"} value="1664">Montserrat (+1664)</option>
                    <option data-countryCode="MA" selected={val === "212"} value="212">Morocco (+212)</option>
                    <option data-countryCode="MZ" selected={val === "258"} value="258">Mozambique (+258)</option>
                    <option data-countryCode="MN" selected={val === "95"} value="95">Myanmar (+95)</option>
                    <option data-countryCode="NA" selected={val === "264"} value="264">Namibia (+264)</option>
                    <option data-countryCode="NR" selected={val === "674"} value="674">Nauru (+674)</option>
                    <option data-countryCode="NP" selected={val === "977"} value="977">Nepal (+977)</option>
                    <option data-countryCode="NL" selected={val === "31"} value="31">Netherlands (+31)</option>
                    <option data-countryCode="NC" selected={val === "687"} value="687">New Caledonia (+687)</option>
                    <option data-countryCode="NZ" selected={val === "64"} value="64">New Zealand (+64)</option>
                    <option data-countryCode="NI" selected={val === "505"} value="505">Nicaragua (+505)</option>
                    <option data-countryCode="NE" selected={val === "227"} value="227">Niger (+227)</option>
                    <option data-countryCode="NG" selected={val === "234"} value="234">Nigeria (+234)</option>
                    <option data-countryCode="NU" selected={val === "683"} value="683">Niue (+683)</option>
                    <option data-countryCode="NF" selected={val === "672"} value="672">Norfolk Islands (+672)</option>
                    <option data-countryCode="NP" selected={val === "670"} value="670">Northern Marianas (+670)</option>
                    <option data-countryCode="NO" selected={val === "47"} value="47">Norway (+47)</option>
                    <option data-countryCode="OM" selected={val === "968"} value="968">Oman (+968)</option>
                    <option data-countryCode="PW" selected={val === "680"} value="680">Palau (+680)</option>
                    <option data-countryCode="PA" selected={val === "507"} value="507">Panama (+507)</option>
                    <option data-countryCode="PG" selected={val === "92"} value="92">Pakistan (+92)</option>
                    <option data-countryCode="PG" selected={val === "675"} value="675">Papua New Guinea (+675)</option>
                    <option data-countryCode="PY" selected={val === "595"} value="595">Paraguay (+595)</option>
                    <option data-countryCode="PE" selected={val === "51"} value="51">Peru (+51)</option>
                    <option data-countryCode="PH" selected={val === "63"} value="63">Philippines (+63)</option>
                    <option data-countryCode="PL" selected={val === "48"} value="48">Poland (+48)</option>
                    <option data-countryCode="PT" selected={val === "351"} value="351">Portugal (+351)</option>
                    <option data-countryCode="PR" selected={val === "1787"} value="1787">Puerto Rico (+1787)</option>
                    <option data-countryCode="QA" selected={val === "974"} value="974">Qatar (+974)</option>
                    <option data-countryCode="RE" selected={val === "262"} value="262">Reunion (+262)</option>
                    <option data-countryCode="RO" selected={val === "40"} value="40">Romania (+40)</option>
                    <option data-countryCode="RU" selected={val === "7"} value="7">Russia (+7)</option>
                    <option data-countryCode="RW" selected={val === "250"} value="250">Rwanda (+250)</option>
                    <option data-countryCode="SM" selected={val === "378"} value="378">San Marino (+378)</option>
                    <option data-countryCode="ST" selected={val === "239"} value="239">Sao Tome &amp; Principe (+239)</option>
                    <option data-countryCode="SA" selected={val === "966"} value="966">Saudi Arabia (+966)</option>
                    <option data-countryCode="SN" selected={val === "221"} value="221">Senegal (+221)</option>
                    <option data-countryCode="CS" selected={val === "381"} value="381">Serbia (+381)</option>
                    <option data-countryCode="SC" selected={val === "248"} value="248">Seychelles (+248)</option>
                    <option data-countryCode="SL" selected={val === "232"} value="232">Sierra Leone (+232)</option>
                    <option data-countryCode="SG" selected={val === "65"} value="65">Singapore (+65)</option>
                    <option data-countryCode="SK" selected={val === "421"} value="421">Slovak Republic (+421)</option>
                    <option data-countryCode="SI" selected={val === "386"} value="386">Slovenia (+386)</option>
                    <option data-countryCode="SB" selected={val === "677"} value="677">Solomon Islands (+677)</option>
                    <option data-countryCode="SO" selected={val === "252"} value="252">Somalia (+252)</option>
                    <option data-countryCode="ZA" selected={val === "27"} value="27">South Africa (+27)</option>
                    <option data-countryCode="ES" selected={val === "34"} value="34">Spain (+34)</option>
                    <option data-countryCode="LK" selected={val === "94"} value="94">Sri Lanka (+94)</option>
                    <option data-countryCode="SH" selected={val === "290"} value="290">St. Helena (+290)</option>
                    <option data-countryCode="KN" selected={val === "1869"} value="1869">St. Kitts (+1869)</option>
                    <option data-countryCode="SC" selected={val === "1758"} value="1758">St. Lucia (+1758)</option>
                    <option data-countryCode="SD" selected={val === "249"} value="249">Sudan (+249)</option>
                    <option data-countryCode="SR" selected={val === "597"} value="597">Suriname (+597)</option>
                    <option data-countryCode="SZ" selected={val === "268"} value="268">Swaziland (+268)</option>
                    <option data-countryCode="SE" selected={val === "46"} value="46">Sweden (+46)</option>
                    <option data-countryCode="CH" selected={val === "41"} value="41">Switzerland (+41)</option>
                    <option data-countryCode="SI" selected={val === "963"} value="963">Syria (+963)</option>
                    <option data-countryCode="TW" selected={val === "886"} value="886">Taiwan (+886)</option>
                    <option data-countryCode="TJ" selected={val === "7"} value="7">Tajikstan (+7)</option>
                    <option data-countryCode="TH" selected={val === "66"} value="66">Thailand (+66)</option>
                    <option data-countryCode="TG" selected={val === "228"} value="228">Togo (+228)</option>
                    <option data-countryCode="TO" selected={val === "676"} value="676">Tonga (+676)</option>
                    <option data-countryCode="TT" selected={val === "1868"} value="1868">Trinidad &amp; Tobago (+1868)</option>
                    <option data-countryCode="TN" selected={val === "216"} value="216">Tunisia (+216)</option>
                    <option data-countryCode="TR" selected={val === "90"} value="90">Turkey (+90)</option>
                    <option data-countryCode="TM" selected={val === "7"} value="7">Turkmenistan (+7)</option>
                    <option data-countryCode="TM" selected={val === "993"} value="993">Turkmenistan (+993)</option>
                    <option data-countryCode="TC" selected={val === "1649"} value="1649">Turks &amp; Caicos Islands (+1649)</option>
                    <option data-countryCode="TV" selected={val === "688"} value="688">Tuvalu (+688)</option>
                    <option data-countryCode="UG" selected={val === "256"} value="256">Uganda (+256)</option>
                    <option data-countryCode="GB" selected={val === "44"} value="44">UK (+44)</option>
                    <option data-countryCode="UA" selected={val === "380"} value="380">Ukraine (+380)</option>
                    <option data-countryCode="AE" selected={val === "971"} value="971">United Arab Emirates (+971)</option>
                    <option data-countryCode="UY" selected={val === "598"} value="598">Uruguay (+598)</option>
                    <option data-countryCode="US" selected={val === "1"} value="1">USA (+1)</option>
                    <option data-countryCode="UZ" selected={val === "7"} value="7">Uzbekistan (+7)</option>
                    <option data-countryCode="VU" selected={val === "678"} value="678">Vanuatu (+678)</option>
                    <option data-countryCode="VA" selected={val === "379"} value="379">Vatican City (+379)</option>
                    <option data-countryCode="VE" selected={val === "58"} value="58">Venezuela (+58)</option>
                    <option data-countryCode="VN" selected={val === "84"} value="84">Vietnam (+84)</option>
                    <option data-countryCode="VG" selected={val === "84"} value="84">Virgin Islands - British (+1284)</option>
                    <option data-countryCode="VI" selected={val === "84"} value="84">Virgin Islands - US (+1340)</option>
                    <option data-countryCode="WF" selected={val === "681"} value="681">Wallis &amp; Futuna (+681)</option>
                    <option data-countryCode="YE" selected={val === "969"} value="969">Yemen (North)(+969)</option>
                    <option data-countryCode="YE" selected={val === "967"} value="967">Yemen (South)(+967)</option>
                    <option data-countryCode="ZM" selected={val === "260"} value="260">Zambia (+260)</option>
                    <option data-countryCode="ZW" selected={val === "263"} value="263">Zimbabwe (+263)</option>
                </optgroup>
            </select>
        )
    }
}

export default MobileCode;