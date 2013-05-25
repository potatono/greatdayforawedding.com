#!/usr/bin/perl

use strict;
use CGI;

my $query = new CGI();
my $name = $query->param('name');
my $message = $query->param('message');
my $valid = $query->param('valid');

if ($valid) {
	open(FIL,"|/usr/sbin/sendmail -f 'no-reply\@greatdayforawedding.com' -t 'justin\@jplt.com' 'munichborn\@gmail.com'");
	print FIL "From: \"Great Day For A Wedding\" <no-reply\@greatdayforawedding.com>\n";
	print FIL "To: \"Justin Day\" <justin\@jplt.com>, \"Angela Lind\" <munichborn\@gmail.com>\n";
	print FIL "Subject: Message from Website\n";
	print FIL "\n";
	print FIL "Name: $name\n\n";
	print FIL "$message\n";
	close(FIL);
}

print $query->redirect('/contact?thank_you=1');


