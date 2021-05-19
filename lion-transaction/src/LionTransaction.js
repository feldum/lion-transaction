import { html, css, LitElement } from 'lit-element';

import '@lion/input/define';
import '@lion/form/define';


export class LionTransaction extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        padding: 3rem;
        color: var(--lion-transaction-text-color, #000);
        width: 20rem;
        font-family: Arial;
      }
      .demo-types-input[shows-feedback-for~='info'] {
        background-color: #d4e4ff;
        border: 1px solid blue;
      }
      .inputs-box{
        display: flex;
        flex-direction: column;
        height: 7rem;
        justify-content: space-evenly;
        padding-bottom: 1rem;
      }
      .buttons-box{
        display:flex;
        justify-content: center;
      }
      .form-box{
        padding:3rem;
        background-color: #DDDDDD
      }
      .submit-btn{
        background-color: #f60;
        color: #fff;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String }
    };
  }

  constructor() {
    super();
    this.name = '';
  }

  _submitHandler = ev => {
    if (ev.target.hasFeedbackFor.includes('error')) {
      const firstFormElWithError = ev.target.formElements.find(el =>
        el.hasFeedbackFor.includes('error'),
      );
      firstFormElWithError.focus();
      return;
    }
  }
  _preprocessAmount = value => {
    return value.replace(/[a-zA-Z]/g, '');
  };

  render() {
    return html`
      <h2>Make a Lion Transaction, ${this.name}!</h2>
      <lion-form @submit=${this._submitHandler}>
        <form @submit=${ev => ev.preventDefault()} class="form-box">
          <lion-fieldset name="nameGroup" label="Name" class="inputs-box">
              <lion-input name="iban" label="IBAN" .fieldName="${'value'}"></lion-input>
              <lion-input name="amount" label="Amount"><div slot="suffix">EUR</div></lion-input>
          </lion-fieldset>
          <div class="buttons-box">
            <lion-transaction-button label='Submit' class="submit-btn">Submit</lion-transaction-button>
            <lion-transaction-button label='Reset'
                @click=${ev => ev.currentTarget.parentElement.parentElement.parentElement.resetGroup()}
            >
            </lion-transaction-button>
          </div>
        </form>
      </lion-form>
    `;
  }
}

