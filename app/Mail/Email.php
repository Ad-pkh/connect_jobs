<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;

class Email extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public string $messageBody;
    public string $subjectLine;

    /**
     * Create a new message instance.
     */
    public function __construct(string $messageBody, string $subjectLine = 'No Subject')
    {
        $this->messageBody = $messageBody;
        $this->subjectLine = $subjectLine;
    }

    /**
     * Define the email envelope (subject, from address, etc).
     */

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subjectLine,
        );
    }

    /**
     * Define the email content (plain text in this case).
     */
    public function content(): Content
    {
        return new Content(

            html: 'emails.plain',
            with: ['messageBody' => $this->messageBody],
        );
    }

    /**
     * Optional attachments.
     */
    public function attachments(): array
    {
        return [
            // Example: attach a file
            // Attachment::fromPath(storage_path('app/public/example.pdf')),
        ];
    }
}
