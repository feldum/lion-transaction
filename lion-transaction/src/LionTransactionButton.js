import { html, css} from 'lit-element';
import { LionButton } from '@lion/button';

export class LionTransactionButton extends LionButton{
    static get styles() {
        return css`
        :host {
            border-radius: 8px;
            background-color: #CCCCCC;
            border: none;
            height: 40px;
            width: 100px;
            font-size: 16px;
            line-height: 24px;
            font-weight: 700;
            margin-right: 1rem;
            align-items: center;
            display: flex;
            justify-content: center;
        }
        `
    }

    static get properties() {
        return {
          label: { type: String }
        };
      }

    constructor() {
       super();
       this.label='default';
    }

    render() {
        return html`
            <lion-button>${this.label}<lion-button>
        `
    }
}

