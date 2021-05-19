import { html, css, LitElement } from 'lit-element';

import { Required, MaxLength, IsNumber } from '@lion/form-core';

import '@lion/input/define';
import '@lion/form/define';

import { loadDefaultFeedbackMessages } from '@lion/validate-messages';

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
      .inputs-box{
        display: flex;
        flex-direction: column;
      }
      .buttons-box{
        display:flex;
        justify-content: center;
        padding-top: 1rem
      }
      .form-box{
        display: flex;
        flex-direction: column;
        padding:1.5rem;
        background-color: #DDDDDD;
        justify-content: flex-start;
      }
      .submit-btn{
        background-color: #f60;
        color: #fff;
      }

      .demo-types-input {
        padding: 0.5rem 0.5rem 1.5rem;
      }
      .demo-types-input[shows-feedback-for~='error'] {
        background-color: #ffd4d4;
        border: 1px solid red;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String }
    };
  }

  static get validationTypes() {
    return ['error'];
  }

  constructor() {
    super();
    this.name = '';
    loadDefaultFeedbackMessages();
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
    return value.replace(/[^0-9.]/g, '');
  };

  render() {
    return html`
      <h2>Make a Lion Transaction, ${this.name}!</h2>
      <lion-form @submit=${this._submitHandler}>
        <form @submit=${ev => ev.preventDefault()} class="form-box">
          <lion-fieldset name="nameGroup" label="Name" class="inputs-box">
            <lion-input name="iban" label="IBAN"  class="demo-types-input"
              .fieldName="${'value'}"
              .validators="${[new Required({ type: 'error' })]}"
            ></lion-input>
            <lion-input name="amount" label="Amount" class="demo-types-input"
              .preprocessor=${this._preprocessAmount}
              .validators="${[new Required(), new MaxLength(10, {
                type: 'error',
                getMessage: () => `Please, keep the length below the 10 characters.`
              })]}">
              <div slot="suffix">EUR</div>
            </lion-input>
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

