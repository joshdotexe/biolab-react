import React, { Component } from 'react'

import LayoutFieldGroup from '../layout-components/layout-field-group'
import LayoutField from '../layout-components/layout-field'
import LayoutSubHeading from '../layout-components/layout-subheading'

class ChemInfo extends Component {
    // copy(e) {
    //     /* Get the text field */
    //     var copyText = e.currentTarget;

    //     /* Select the text field */
    //     copyText.select();

    //     /* Copy the text inside the text field */
    //     document.execCommand("copy");

    //     /* Alert the copied text */
    //     alert("Copied the text: " + copyText.value);
    // }
    render() {
        return (
            <div>
                <LayoutSubHeading heading="Properties" />
                <LayoutFieldGroup>
                    {this.props.details.map((item, index) =>
                        <LayoutField multiline="true" label={item.name} key={index}>
                            {item.value}
                        </LayoutField>
                    )}
                </LayoutFieldGroup>
            </div>
        )
    }
}
export default ChemInfo;