"use client";

import React, { useActionState, useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createIdea } from '@/lib/actions';

const StartupForm = () => {
    const [ errors, setErrors ] = useState<Record<string, string>>({});
    const [ pitch, setPitch] = useState<string>("");
    const router = useRouter()
    
    async function handleFormSubmit(prevState: any, formData: FormData) {
        try {
          const formValues = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            category: formData.get("category") as string,
            link: formData.get("link") as string,
            pitch,
          };
    
          // Validate form values
          await formSchema.parseAsync(formValues);

          // Create the idea and handle the result
          const result = await createIdea(prevState, formData, pitch);
    
          if (result.status === "SUCCESS") {
            toast.success('Your story has been created successfully', {
                duration: 3000,  // hide after 3 seconds
            });
    
            router.push(`/startup/${result._id}`);
          }
          return result;
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;
            setErrors(fieldErrors as unknown as Record<string, string>);
    
            toast.error('Something went wrong! Please check your inputs.', {
                duration: 3000,  // hide after 3 seconds
            });
    
            return { ...prevState, error: "Validation failed", status: "ERROR" };
          }
    
          toast.error("An unexpected error occurred", {
            duration: 3000,  // hide after 3 seconds
          });
    
          return {
            ...prevState,
            error: "An unexpected error occurred",
            status: "ERROR",
          };
        } finally {
          setPitch("");
        }
      }
    
    const [ state, formAction, isPending ] = useActionState(handleFormSubmit,
        {
            error: "",
            status: "INITIAL"
        }
    );


  return (
    <form action={formAction} className='startup-form'>
        <div>
            <label htmlFor="title" className='startup-form_label'>
                Title
            </label>
            <input 
                id='title' 
                name="title"
                className='startup-form_input'
                placeholder='Story Title' 
                required 
            />

            {errors.title && <p className='startup-form_error'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className='startup-form_label'>
                Description
            </label>
            <input 
                id='description' 
                name="description"
                className='startup-form_textarea'
                placeholder='Story Description'
                required 
            />

            {errors.description && <p className='startup-form_error'>{errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className='startup-form_label'>
                Category
            </label>
            <input 
                id='category' 
                name="category"
                className='startup-form_input'
                placeholder='Story Category (Tech, Health, Education...)' 
                required 
            />

            {errors.category && <p className='startup-form_error'>{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className='startup-form_label'>
                Image URL
            </label>
            <input 
                id='link' 
                name="link"
                className='startup-form_input'
                placeholder='Story Image URL' 
                required 
            />

            {errors.link && <p className='startup-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="pitch" className='startup-form_label'>
                Go Big
            </label>
            <MDEditor
                value={pitch} 
                onChange={(value) => setPitch(value as string)} 
                id="pitch"
                preview="edit"
                height={300}
                style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #ccc" }}
                textareaProps={{
                    placeholder: "Write your Story here...",
                }}
                previewOptions={{
                    disallowedElements: ["style"],
                }}
            />

            {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
        </div>

        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
            {isPending ? "Creating..." : "Create Story"}
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default StartupForm