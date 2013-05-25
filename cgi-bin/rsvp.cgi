#!/usr/bin/perl

use strict;
use CGI;

my $query = new CGI();
my $info = $query->param('info');
my $restrictions = $query->param('restrictions');
my $favorite = $query->param('favorite');
my $valid = $query->param('valid');
my $message = "RSVP INFORMATION\n\n$info\n\nDIETARY RESTRICTIONS\n\n$restrictions\n\nFAVORITE SONG\n\n$favorite\n";

if ($valid) {
	open(FIL,"|/usr/sbin/sendmail -f 'no-reply\@greatdayforawedding.com' -t 'justin\@jplt.com' 'munichborn\@gmail.com'");
	print FIL "From: \"Great Day For A Wedding\" <no-reply\@greatdayforawedding.com>\n";
	print FIL "To: \"Justin Day\" <justin\@jplt.com>, \"Angela Lind\" <munichborn\@gmail.com>\n";
	print FIL "Subject: RSVP\n";
	print FIL "\n";
	print FIL "$message\n";
	close(FIL);
}

print $query->redirect('/rsvp?thank_you=1&valid='.$valid);


