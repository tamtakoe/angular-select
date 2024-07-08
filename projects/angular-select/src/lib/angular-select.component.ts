import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  OnChanges,
  Input,
  forwardRef,
  ElementRef,
  ViewEncapsulation,
  Optional,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Select } from 'base-select';

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

export interface SelectOptions {
  multiple?: boolean;
  multipleLimit?: number;
  removable?: boolean;
  editable?: boolean;
  creatable?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  keepOpened?: boolean;
  openByRemove?: boolean;
  closeByRemove?: boolean;
  closeBySelect?: boolean;
  openByActiveRemove?: boolean;
  openByInputClick?: boolean;
  activeByOpen?: boolean;
  hideSelected?: boolean;
  useCache?: boolean;
  valueField?: string;
  groupField?: string;
  searchField?: string;
  trackField?: string;
  disabledField?: string;
  dropdownItemLabelField?: string;
  selectedItemLabelField?: string;
  emptyDropdownLabel?: string;
  placeholder?: string;
  titlePlaceholder?: string;
  multiplePlaceholder?: string;
  position?: string;
  editItemFn?: (item: any) => any;
  createItemFn?: (item: any) => any;
  removeItemFn?: (item: any) => any;
  getItems?: (query: string) => any[] | Promise<any[]>;
  getItemsByValue?: (query: string) => any[] | Promise<any[]>;
  valueFieldGetter?: (valueField: string) => any;
  groupFieldGetter?: (groupField: string) => string;
  searchFieldGetter?: (searchField: string) => string;
  trackFieldGetter?: (trackField: string) => string;
  disabledFieldGetter?: (disabledFiel: string) => string;
  dropdownItemLabelGetter?: (dropdownItemLabelField: string) => string;
  selectedItemLabelGetter?: (selectedItemLabelField: string) => string;
  customAreaGetter?: () => any;
  items?: any;
  models?: any;
  size?: string;
  getTitle?: (fieldName?: string) => string;
}

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'oi-angular-select',
  template: '<ng-content></ng-content>',
  styleUrl: 'angular-select.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AngularSelectComponent),
    multi: true,
  }]
})
export class AngularSelectComponent implements ControlValueAccessor, OnChanges {
  @Input() @Optional() options: SelectOptions = {};
  @Input() @Optional() multiple: boolean | string;
  @Input() @Optional() multipleLimit: number;
  @Input() @Optional() removable: boolean | string;
  @Input() @Optional() editable: boolean | string;
  @Input() @Optional() creatable: boolean | string;
  @Input() @Optional() readonly: boolean | string;
  @Input() @Optional() disabled: boolean | string;
  @Input() @Optional() keepOpened: boolean;
  @Input() @Optional() openByRemove: boolean;
  @Input() @Optional() closeByRemove: boolean;
  @Input() @Optional() closeBySelect: boolean;
  @Input() @Optional() openByActiveRemove: boolean;
  @Input() @Optional() openByInputClick = true;
  @Input() @Optional() activeByOpen: boolean;
  @Input() @Optional() hideSelected: boolean;
  @Input() @Optional() useCache: boolean;
  @Input() @Optional() valueField: string;
  @Input() @Optional() groupField: string;
  @Input() @Optional() searchField: string;
  @Input() @Optional() trackField: string;
  @Input() @Optional() disabledField: string;
  @Input() @Optional() dropdownItemLabelField: string;
  @Input() @Optional() selectedItemLabelField: string;
  @Input() @Optional() emptyDropdownLabel: string;
  @Input() @Optional() placeholder = 'Search';
  @Input() @Optional() titlePlaceholder = 'Select...';
  @Input() @Optional() multiplePlaceholder: string;
  @Input() @Optional() position: string;
  @Input() @Optional() editItemFn: (item: any) => any;
  @Input() @Optional() createItemFn: (item: any) => any;
  @Input() @Optional() removeItemFn: (item: any) => any;
  @Input() @Optional() getItems: (query: string) => any[] | Promise<any[]>;
  @Input() @Optional() getItemsByValue: (query: string) => any[] | Promise<any[]>;
  @Input() @Optional() valueFieldGetter: (item: string) => any;
  @Input() @Optional() groupFieldGetter: (groupField: string) => string;
  @Input() @Optional() searchFieldGetter: (searchField: string) => string;
  @Input() @Optional() trackFieldGetter: (trackField: string) => string;
  @Input() @Optional() disabledFieldGetter: (disabledFiel: string) => string;
  @Input() @Optional() dropdownItemLabelGetter: (dropdownItemLabelField: string) => string;
  @Input() @Optional() selectedItemLabelGetter: (selectedItemLabelField: string) => string;
  @Input() @Optional() customAreaGetter: () => any;
  @Input() @Optional() getTitle: (fieldName?: string) => string;
  @Input() @Optional() models: any;
  @Input() @Optional() size: any;

  select: Select | undefined;
  isBrowser = false;

  constructor(private element: ElementRef, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId)
  }

  collectOptions(this: any) {
    const options = {
      // selectionLabelGetter: this.getTitle, //TODO implement normal merge
      // itemLabelGetter: this.getTitle,
      multiple: this.multiple || this.multiple === '',
      multipleLimit: this.multipleLimit >= 0 ? this.multipleLimit : Infinity,
      removable: this.removable || this.removable === '',
      editable: this.editable || this.editable === '',
      creatable: this.creatable || this.creatable === '',
      readonly: this.readonly || this.readonly === '',
      disabled: this.disabled || this.disabled === '',
      keepOpened: this.keepOpened,
      openByRemove: this.openByRemove,
      closeByRemove: this.closeByRemove,
      closeBySelect: this.closeBySelect === undefined ? !this.multiple : this.closeBySelect,
      openByActiveRemove: this.openByActiveRemove === undefined ? !this.multiple : this.openByActiveRemove,
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
    if (!this.isBrowser) {
      return
    }
    const options: any = Object.assign({}, this.collectOptions(), this.options);

    if (!this.select) {
      const element = this.element.nativeElement;
      
      element.addEventListener('change', (e: any) => {
        const value = e.isTrusted ? this.select.value : e.value; // Check if internal select event and don't change value

        this.onChange(value);
        this.onTouched();
      });

      this.select = new Select(element, options);
    } else {
      this.select.setParams(options);
    }
  }

  /** ControlValueAccessor interface methods. **/
  writeValue(value: any) {
    this.select && this.select.setParams({value});
  }

  registerOnChange(fn: () => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(this: any, isDisabled: boolean) {
    this.select && this.select.setParams({disabled: isDisabled});
  }

  private onChange = () => {};
  private onTouched = () => {};
}

