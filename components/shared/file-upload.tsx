import * as React from "react"
import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    field?: { value: any; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void };
}

const FileUpload = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, id, ...props }, ref) => {

        const [uploadedFile, setUploadedFile] = useState<string | ArrayBuffer | null>(null);

        function handleFileChange(event: any) {
            const file = event.target.files[0];

            if (!file) return setUploadedFile(null);

            const fileReader = new FileReader();
            fileReader.onload = () => {
                setUploadedFile(fileReader.result);
            }
            fileReader.readAsDataURL(file);
        }
        return (
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor={id}
                    onChange={handleFileChange}
                    className="flex flex-col items-center justify-center w-full h-54 max-h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ">

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
                        <Image
                            alt="Category image"
                            src={uploadedFile.toString()}
                            className="object-contain overflow-hidden"
                            width={350}
                            height={150}
                        />
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
