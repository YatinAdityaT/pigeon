from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives

body = """
Hi there!<br>
Someone invited to join Pigeon - the real-time browser-based chat app!
Create your account today at: &lt;domain_name&gt;/register<br>

Follow these simple steps:<br>
1. Register yourself using <b>this email address</b>.<br>
2. You will receive an email validation link on this email address.<br>
3. Click on that link to validate your email address.<br>
4. Login with your email address and password.<br>
5. After logging in you will find the group/s that you have been invited too.<br>
6. Happy chatting!<br>
"""


def send_mail_to_invitee(to):
    subject = "Invitation to join Pigeon"
    from_address = 'pigeon.chat.application@gmail.com'

    # send_mail(subject, body, from_address,
    #           [to], fail_silently=False)

    print("sent email to", to)

    text_content = 'This is an important message.'
    msg = EmailMultiAlternatives(subject, text_content, from_address, [to])
    msg.attach_alternative(body, "text/html")
    msg.send()


def test():
    send_mail_to_invitee('fake90585@gmail.com')
