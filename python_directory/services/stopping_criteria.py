from transformers import StoppingCriteria

class TokenStoppingCriteria(StoppingCriteria):
    """
    Custom stopping criteria to simulate streaming-like behavior by limiting to one token at a time.
    """
    def __init__(self):
        super().__init__()

    def __call__(self, input_ids, scores, **kwargs):
        return True  # Stop after each token
