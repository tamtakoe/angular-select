import {
  Component,
  OnChanges,
  Input,
  Output,
  forwardRef,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Select } from 'base-select';

export const SEARCH_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AngularSelectComponent),
  multi: true,
};

// function deepFind(obj: any, path: string) {
//   if (!path) return obj;
//
//   const paths = path.split('.');
//   let i, current = obj;
//
//   for (i = 0; i < paths.length; ++i) {
//     if (current[paths[i]] == undefined) {
//       return undefined;
//     } else {
//       current = current[paths[i]];
//     }
//   }
//   return current;
// }


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'oi-angular-select',
  template: '<ng-content></ng-content>',
  styleUrl: 'angular-select.scss',
  providers: [SEARCH_SELECT_VALUE_ACCESSOR]
})
export class AngularSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() options: any = {};
  @Input() multiple: any;
  @Input() multipleLimit: number | undefined;
  @Input() removable: boolean | undefined;
  @Input() editable: boolean | undefined;
  @Input() creatable: boolean | undefined;
  @Input() readonly: boolean | undefined;
  @Input() disabled: boolean | undefined;
  @Input() keepOpened: boolean | undefined;
  @Input() openByRemove: boolean | undefined;
  @Input() closeByRemove: boolean | undefined;
  @Input() closeBySelect: boolean | undefined;
  @Input() openByActiveRemove: boolean | undefined;
  @Input() openByInputClick: boolean = true;
  @Input() activeByOpen: boolean | undefined;
  @Input() hideSelected: boolean | undefined;
  @Input() useCache: boolean | undefined;
  @Input() valueField: string | undefined;
  @Input() groupField: string | undefined;
  @Input() searchField: string | undefined;
  @Input() trackField: string | undefined;
  @Input() disabledField: string | undefined;
  @Input() dropdownItemLabelField: string | undefined;
  @Input() selectedItemLabelField: string | undefined;
  @Input() emptyDropdownLabel: string | undefined;
  @Input() placeholder = 'Search';
  @Input() titlePlaceholder = 'Select...';
  @Input() multiplePlaceholder: string | undefined;
  @Input() position: string | undefined;
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
  @Input() size: any;
  @Input() getTitle: any;
  @Input() models: any;

  select: Select | undefined;

  constructor(private element: ElementRef) {}

  collectOptions(this: any) {
    const options = {
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

    if (!options.items) { // TODO Change options detection in base-select
      delete options.items;
    }

    return options;
  }

  ngOnChanges(this: any) {
    if (!this.select) {
      const element = this.element.nativeElement;
      const options: any = Object.assign({}, this.options, this.collectOptions());

      element.addEventListener('change', (e: any) => {
        const value = e.isTrusted ? this.select.value : e.value; // Check if internal select event and don't change value

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

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(this: any, isDisabled: boolean) {
    this.select.setParams({disabled: isDisabled});
  }

  private onChange = () => {};
  private onTouched = () => {};
}

