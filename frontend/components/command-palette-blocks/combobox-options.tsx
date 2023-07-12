import { Combobox } from "@headlessui/react";
import { LightBulbIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  interface IComboboxOptions{
    liste?:Array<any>
    titre:string
    description?:string
    Icon?: any
    field?: string
    value?: any;
  }

  /**
   * 
   * @param param0 IComboboxOptions where the filed is the field to display from the list items
   * @returns 
   */
export default function ComboboxOptions({liste, titre, Icon, field, value, description}: IComboboxOptions){

    return (
        <li>
          <h2 className="text-xs font-semibold text-stone-900">{titre}</h2>
          <ul className="-mx-4 mt-2 text-sm text-stone-700">
            {liste && liste.map((item) => (
              <Combobox.Option
                key={item[field]}
                value={value ? value: item[field]}
                className={({ active }) =>
                  classNames(
                    'flex cursor-default select-none items-center px-4 py-2',
                    active && 'bg-slate-600 text-white'
                  )
                }
              >
                {({ active }) => (
                  <>
                  {/* @ts-ignore */}
                    <Icon
                      className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-stone-400')}
                      aria-hidden="true"
                    />
                    <span className="ml-3 flex-auto truncate">{item[field]}</span>
                  </>
                )}
              </Combobox.Option>
            ))} 

            {
                description && <div className="p-12 flex flex-col items-center">
                    <LightBulbIcon className="w-10 h-10" />
                    <p className="text-center">{description}</p>
                </div>
            }
          </ul>
        </li>
      );
}