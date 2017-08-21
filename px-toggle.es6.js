(function() {
  'use strict';

    Polymer({
      is: 'px-toggle',
      behaviors : [Polymer.IronCheckedElementBehavior],
      /* Properties for this component */
      properties: {

         /**
           * The disabled state attribute for the component.
           * @type {Boolean}
           * @default false
           */
          disabled: {
            type: Boolean,
            value: false,
            reflectToAttribute: true
          },
          items: {
            type: Array,
            reflectToAttribute: true
          },
          selected: {
            type: String,
            reflectToAttribute: true,
            notify: true
          }
      },

      attached() {
        this.setAttribute('role','switch');
        if (this.selected)
          Polymer.dom(this.root).querySelector('li#' + this.selected).classList.add("active");
      },

      _checkDisabledState(disabled){
        this.setAttribute('aria-disabled',disabled);
        return `${(disabled ? 'toggle--disabled' : '')}`;
      },


      onChangeSelect(evt) {
        console.log(evt);
        const el = evt.srcElement;
        const parentEl = evt.srcElement.parentElement;
        if(!this.disabled) {
          this.debounce('checkSelect', function() {
            this.set('selected', evt.srcElement.id);
            Polymer.dom(this.root).querySelectorAll('li').forEach((el) => {
                el.classList.remove("active");
            });
            parentEl.classList.add("active");
          },50);
        }
        return false;
      }
    });
  }
)();
