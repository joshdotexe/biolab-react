import React, { Component } from 'react'
import LayoutDialog from '../layout-components/layout-dialog'
import LayoutSubHeading from '../layout-components/layout-subheading'
import ChemApi from './chem-api'
import ChemInfo from './chem-info'

class ChemDialog extends Component {

    hide(e) {
        this.dialog.current.hide();
    }
    show(chem) {
        this.setState({ chem: chem });
        this.chemApi.current.getChemData(chem);
        this.dialog.current.show();
    }
    onInfoResponse(response) {
        console.log("onInfoResponse", response);
        if(!response.InformationList.Information) return;
        //InformationList.Information
        var info = response.InformationList.Information.find(i => i.DescriptionSourceName === "NCIt" || i.Description !== undefined);
        if(info === undefined) return;

        var desc = info.Description;
        desc = desc.replace(/<[^>]*>/g, '');
        this.setState({
            description: desc
        });
    }
    onDataResponse(response) {
        console.log("onDataResponse", response.PC_Compounds[0].props);
        var props = response.PC_Compounds[0].props;
        var details = [];
        props.forEach(p => {
            var detail = {
                name: `${p.urn.label} ${p.urn.name || ''}`.trim(),
                value:p.value.ival || p.value.sval || p.value.fval
            }
            details.push(detail);
        });
        this.setState({
            details:details
        })
        this.chemApi.current.getChemDescription(this.state.chem);
        this.setState({
            description: "N/A"
        });
    }
    render() {
        return (
            <div>
                <ChemApi ref={this.chemApi}
                    onDataResponse={this.onDataResponse.bind(this)}
                    onInfoResponse={this.onInfoResponse.bind(this)} />
                <LayoutDialog main={
                    <div>
                        <img alt={`This is ${this.state.chem}`}
                            height="200"
                            width="100%"
                            src={this.state.chem ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${this.state.chem}/PNG` : ''} />
                        <LayoutSubHeading heading="Description"/>
                        <p>
                        {this.state.description}
                        </p>
                        <ChemInfo details={this.state.details} />
                    </div>
                }
                    actions={
                        <button onClick={this.hide.bind(this)} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">close</i>
                        </button>
                    }
                    ref={this.dialog} tapToHide="true" heading={this.state.chem} />
            </div>
        );
    }
    constructor(props) {
        super(props);
        this.state = {
            chem: '',
            description:"",
            details:[]
        }
        this.chemApi = React.createRef();
        this.dialog = React.createRef();
    }
}

export default ChemDialog;