import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ElementRef,
  ComponentFactoryResolver, // for load components
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Select } from './js-select/select';


export const SEARCH_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularSelectComponent),
  multi: true,
};

function deepFind(obj, path) {
  if (!path) return obj;

  const paths = path.split('.');
  let i, current = obj;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'oi-angular-select',
  template: '<ng-content></ng-content>',
  styleUrls: ['./js-select/select.scss', './js-select/select-bootstrap.scss'],
  providers: [SEARCH_SELECT_VALUE_ACCESSOR]
})
export class AngularSelectComponent implements ControlValueAccessor, OnInit {
// <search-select formControlName="location"
//     [models]="locations"
//   size="sm"
//   dontUpdate="true"
//   titlePlaceholder="Select location..."
//   searchField="locationDescription"></search-select>

  @Input() size;
  @Input() multiple;
  @Input() options: any = {};
  @Input() getTitle;
  @Input() dontUpdate;
  @Input() valueField;
  @Input() searchField = false;
  @Input() trackField = false;
  @Input() placeholder = 'Search';
  @Input() titlePlaceholder = 'Select...';
  @Input()
  get models() {
    return this._models;
  }
  set models(items) {
    this._models = items;

    if (this.select) {
      this.select.setParams({items: items});

      // if (!this.dontUpdate) {
      //   const value = null;
      //   console.log('models value', value);
      //   debugger
      //   this.select.setParams({value: value});
      //   // this.select.selectItems(value);
      //   this.onChange(value);
      //   this.onTouched(value);
      // }
    }
    // this.select.setParams({items: items})

  }

  @Input()
  set disabled(isDisabled) {
    if (this.select) {
      this.select.setParams({disabled: isDisabled});
    }
  }
  // @Input() titleField;

  // @ViewChild('select') el:ElementRef;

  //@ViewChild(SearchVersionPanelDirective) private searchVersionPanelHost: SearchVersionPanelDirective; //for load components

  private onChange = (value: any) => {};
  private onTouched = () => {};

  select: Select;
  selectedItems;
  _models = [];
  titleField;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private element: ElementRef) {}

  ngOnInit() {
    const initParams = {
      // selectionLabelGetter: this.getTitle, //TODO implement normal merge
      // itemLabelGetter: this.getTitle,
      multiple: this.multiple || this.multiple === '',
      placeholder: this.titlePlaceholder,
      items: this._models,
      trackField: this.trackField,
      searchField: this.searchField,
      valueField: this.valueField
    };
    const element = this.element.nativeElement;
    const params: any = Object.assign({}, this.options, initParams);

    element.addEventListener('change', (e: any) => {
      // console.log('CHANGE', e.value, element.attributes['formControlName'], this.select.value);

      // if (element.attributes['formControlName'].value === 'location') {
      //   setTimeout(() => {
      //     this.onChange(e.value);
      //     this.onTouched();
      //   }, 100)
      // } else {
      //   const value = this.select && this.select.params.multiple ? [].concat(e.value) : e.value;
      const value = e.isTrusted ? this.select.value : e.value; // Check if internal select ivent and don't change value

      this.onChange(value);
      this.onTouched();
      // }


    });

    // element.addEventListener('click:selected', (e: any) => {
    //   console.log(123, e.detail.item);
    //
    //   const instanceSelectAreaElement = e.detail.element.querySelector('.instance-select-area');
    //   // const instanceSelectElement =
    //   // instanceSelectAreaElement.appendChild()
    //   const instanceOptions = e.detail.item.instances.map(instance => `<option>${instance.server.name}</option>`).join('');
    //   // instanceSelectAreaElement.innerHTML = `<select>${instanceOptions}</select>`
    // })

    if (this.getTitle) {
      params.selectedItemLabelGetter = this.getTitle;
      params.dropdownItemLabelGetter = this.getTitle;
    }

    this.select = new Select(element, params);
  }

  /** ControlValueAccessor interface methods. **/
  writeValue(value: any) {
    // console.log(this.select.value);
    // debugger
    // console.log('this.select.setParams', value);
    // this.myForm.patchValue({counter: 0}, {emitEvent : false});
    this.select.setParams({value: value});
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.select.setParams({disabled: isDisabled});
  }
}

