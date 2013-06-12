<?php
$field_name = stripslashes(strip_tags(trim($_POST['name'])));
$field_email = stripslashes(strip_tags(trim($_POST['email'])));
$field_message = stripslashes(strip_tags(trim($_POST['message'])));

?>
	<script language="javascript" type="text/javascript">
		alert('Message success!');
		// window.location = 'contact_page.html';
	</script>
<?php


$mail_to = 'victoratteh@gmail.com';
$subject = 'Message from a site visitor '.$field_name;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Message: '.$field_message;

$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$email_status =  mail($mail_to, $subject, $body_message, $headers);


if ($email_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Message success!');
		// window.location = 'contact_page.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message failed.');
		// window.location = 'contact_page.html';
	</script>
<?php
}

// return $email_status;
?>
