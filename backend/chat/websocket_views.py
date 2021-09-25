def fetch_chat_rooms(*args, **kwargs):
    print('chat rooms fetched', args, kwargs)
    print(*args.kwargs['group_id'], **kwargs)


def fetch_messages_in_chat_room(*args, **kwargs):
    pass


def new_message(*args, **kwargs):
    pass
