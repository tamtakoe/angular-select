import {
  Component,
  OnChanges,
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
export class AngularSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: any = {};
  @Input() multiple: any;
  @Input() multipleLimit: number;
  @Input() removable: boolean;
  @Input() editable: boolean;
  @Input() creatable: boolean;
  @Input() readonly: boolean;
  @Input() disabled: boolean;
  @Input() keepOpened: boolean;
  @Input() openByRemove: boolean;
  @Input() closeByRemove: boolean;
  @Input() closeBySelect: boolean;
  @Input() openByActiveRemove: boolean;
  @Input() openByInputClick: boolean;
  @Input() activeByOpen: boolean;
  @Input() hideSelected: boolean;
  @Input() useCache: boolean;
  @Input() valueField: string;
  @Input() groupField: string;
  @Input() searchField: string;
  @Input() trackField: string;
  @Input() disabledField: string;
  @Input() dropdownItemLabelField: string;
  @Input() selectedItemLabelField: string;
  @Input() emptyDropdownLabel: string;
  @Input() placeholder = 'Search';
  @Input() titlePlaceholder = 'Select...';
  @Input() multiplePlaceholder: string;
  @Input() position: string;
  @Input() editItemFn: any;
  @Input() createItemFn: any;
  @Input() removeItemFn: any;
  @Input() getItemsByValue: any;
  @Input() valueFieldGetter: any;
  @Input() groupFieldGetter: any;
  @Input() searchFieldGetter: any;
  @Input() trackFieldGetter: any;
  @Input() disabledFieldGetter: any;
  @Input() dropdownItemLabelGetter: any;
  @Input() selectedItemLabelGetter: any;
  @Input() customAreaGetter: any;
  @Input() size;
  @Input() getTitle;
  @Input() models; // items

  select: Select;
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private element: ElementRef) {}
  collectOptions() {
    return {
      // selectionLabelGetter: this.getTitle, //TODO implement normal merge
      // itemLabelGetter: this.getTitle,
      multiple: this.multiple || this.multiple === '',
      multipleLimit: this.multipleLimit >= 0 ? this.multipleLimit : Infinity,
      removable: this.removable,
      editable: this.editable,
      creatable: this.creatable,
      readonly: this.readonly,
      disabled: this.disabled,
      keepOpened: this.keepOpened,
      openByRemove: this.openByRemove,
      closeByRemove: this.closeByRemove,
      closeBySelect: this.closeBySelect,
      openByActiveRemove: this.openByActiveRemove,
      openByInputClick: this.openByInputClick,
      activeByOpen: this.activeByOpen,
      hideSelected: this.hideSelected,
      useCache: this.useCache,
      valueField: this.valueField,
      groupField: this.groupField,
      searchField: this.searchField,
      trackField: this.trackField,
      disabledField: this.disabledField,
      dropdownItemLabelField: this.dropdownItemLabelField,
      selectedItemLabelField: this.selectedItemLabelField,
      emptyDropdownLabel: this.emptyDropdownLabel,
      placeholder: this.placeholder,
      titlePlaceholder: this.titlePlaceholder,
      multiplePlaceholder: this.multiplePlaceholder,
      position: this.position,
      editItemFn: this.editItemFn,
      createItemFn: this.createItemFn,
      removeItemFn: this.removeItemFn,
      getItemsByValue: this.getItemsByValue,
      valueFieldGetter: this.valueFieldGetter,
      groupFieldGetter: this.groupFieldGetter,
      searchFieldGetter: this.searchFieldGetter,
      trackFieldGetter: this.trackFieldGetter,
      disabledFieldGetter: this.disabledFieldGetter,
      dropdownItemLabelGetter: this.dropdownItemLabelGetter || this.getTitle,
      selectedItemLabelGetter: this.selectedItemLabelGetter || this.getTitle,
      customAreaGetter: this.customAreaGetter,
      items: this.models
    };
  }

  ngOnChanges(ch) {
    if (!this.select) {
      const element = this.element.nativeElement;
      const options: any = Object.assign({}, this.options, this.collectOptions());

      element.addEventListener('change', (e: any) => {
        const value = e.isTrusted ? this.select.value : e.value; // Check if internal select ivent and don't change value

        this.onChange(value);
        this.onTouched();
      });

      this.select = new Select(element, options);
    } else {
      this.select.setParams(this.collectOptions());
    }
  }

  /** ControlValueAccessor interface methods. **/
  writeValue(value: any) {
    // console.log(this.select.value);
    // debugger
    // console.log('this.select.setParams', value);
    // this.myForm.patchValue({counter: 0}, {emitEvent : false});
    this.select.setParams({value});
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

