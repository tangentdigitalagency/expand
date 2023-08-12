"use client"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { ExpandValidation } from '@/lib/validations/expand'
import { createExpansion } from '@/lib/actions/expand.action'



interface Props {
  userId: string;
};

function PostExpand({ userId }: Props) {

  
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(ExpandValidation),
    defaultValues: {
      expand: '',
      accountId: userId,
    }
  })
  
  const onSubmit = async (values: z.infer<typeof ExpandValidation>) => {

    await createExpansion({
      text: values.expand,
      author: userId,
      communityId: null,
      path: pathname,
    })

    router.push('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">

      <FormField
          control={form.control}
          name="expand"
          render={({ field }) => (
            <FormItem className='flex flex-col  gap-3 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Expand your idea, challenge others...
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                <Textarea
                  rows={15}
                  placeholder='Write your best ideas here...'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-base-semibold text-gray-200'/>

            </FormItem>
          )}
        />

        <Button type='submit' className='bg-primary-500'>Expand Your Idea</Button>
      </form>
    </Form>
    )
}

export default PostExpand;