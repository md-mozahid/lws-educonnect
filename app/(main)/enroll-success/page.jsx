import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import { getSingleCourse } from '@/queries/courses'
import { getUserByEmail } from '@/queries/users'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { enrollForCourse } from '@/queries/enrollments'
import { sendEmails } from '@/lib/emails'

export default async function Success({
  searchParams: { session_id, courseId },
}) {
  // console.log(session_id, courseId)

  if (!session_id)
    throw new Error('Please provide a valid session id that start with cs_')

  const userSession = await auth()
  const email = userSession?.user?.email
  // console.log(email)
  if (!email) {
    redirect('/login')
  }

  const course = await getSingleCourse(courseId)
  const loggedInUser = await getUserByEmail(email)
  // console.log('loggedInUser', loggedInUser)
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })
  //console.log(checkoutSession);

  const paymentIntent = checkoutSession?.payment_intent
  const paymentStatus = paymentIntent?.status

  // console.log(paymentStatus)

  // Customer info
  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`
  const customerEmail = loggedInUser?.email
  const productName = course?.title
  // console.log(productName, customerName, customerEmail)

  if (paymentStatus === 'succeeded') {
    // Update DB(Enrollment collection)
    // console.log(course?.id, loggedInUser?.id)
    const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      'stripe'
    )
    // console.log(enrolled)

    // Send Emails to the instructor, student,and the person
    // who paid

    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`
    const instructorEmail = course?.instructor?.email

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${productName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${productName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${productName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${productName}`,
      },
    ]

    const emailSentResponse = await sendEmails(emailsToSend)
    console.log(emailSentResponse)
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! You Enrollment was Successful
        </h1>
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="#">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
