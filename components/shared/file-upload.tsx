import * as React from "react"
import { useState, useRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    field?: { value: any; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void };
}

const FileUpload = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, id, ...props }, ref) => {

        const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(null);
        const imageRef = useRef(null)

        function handleFileChange(event: any) {
            const file = event.target.files[0];

            if (!file) return setUploadedFile(null);

            const fileReader = new FileReader();
            fileReader.onload = () => {
                setUploadedFile(fileReader.result);
            }
            fileReader.readAsDataURL(file);
        }

        const removeImage = (event: any) => {
            event.preventDefault();
            setUploadedFile(null);

        };
        return (
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor={id}
                    onChange={handleFileChange}
                    className={cn(!uploadedFile && `flex flex-col items-center w-full lg:w-3/4 h-64 max-h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 `)}>

                    {!uploadedFile &&
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click
                                to
                                upload</span></p>
                            <p className="text-xs text-gray-500 text-center">Max size 5MB</p>
                        </div>
                    }

                    {uploadedFile &&
                        <div className="relative me-2 ">
                            <button className="absolute right-[-5px] top-[-10px] bg-red-700 text-white rounded-full p-1 cursor-pointer" type="button" onClick={removeImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="currentColor" viewBox="0 0 384 512">
                                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                </svg>
                            </button>

                            <Image
                                alt="Category image"
                                src={(uploadedFile) ? uploadedFile.toString() : ""}
                                className="object-contain overflow-hidden max-h-56 w-fit rounded-lg shadow-lg shadow-gray-400"
                                width={350}
                                height={250}
                                ref={imageRef}
                            />
                        </div>
                    }

                    <input
                        id={id}
                        type="file"
                        className={cn(className, `hidden`)}
                        ref={ref}
                        {...props} />

                </label>
            </div>
        )
    }
)
FileUpload.displayName = "FileUpload"

export { FileUpload }
